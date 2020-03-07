// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { getDatabase } = require("./db/setup-db");
const { sendArbitraryCommand, determineOS, listWorkingDir, listDir, workingDir } = require("./utils/requests");
const { parseMultiline } = require("./utils/utils");



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + "/preload.js"
    }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
  mainWindow.maximize();

  const db = await getDatabase("shells", "websql");
  const shellCollection = db.shells;
  var selectedShell = null;

  ipcMain.on("shell:create", async (event, shellDetails) => {
    try {
      await shellCollection.insert(shellDetails);
      event.reply("shell:create-reply", shellDetails);
      event.reply("misc:alert", {alertType: "success", alertMessage: "Shell created"});
    } catch (error) {
      console.error(error);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to create shell!"});
    }
  });

  ipcMain.on("shell:list", async (event) => {
    try {
      const collection = await shellCollection.dump();
      const shells = collection.docs;
      event.reply("shell:list-reply", shells);
    } catch (error) {
      console.error(error);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to list shells!"});
    }
  });

  ipcMain.on("shell:delete", async (event, shellDetails) => {
    try {
      const shell = await shellCollection.findOne().where("ipOrHostname").eq(shellDetails.ipOrHostname);
      await shell.remove();
      event.reply("shell:delete-reply");
      event.reply("misc:alert", {alertType: "success", alertMessage: "Shell deleted"});
    } catch (error) {
      console.error(error);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to delete shell!"});
    }
  });

  ipcMain.on("shell:update", async (event, shellDetails) => {
    try {
      const shell = await shellCollection.findOne().where("ipOrHostname").eq(shellDetails.ipOrHostname);
      await shell.update({$set: shellDetails});
      event.reply("misc:alert", {alertType: "success", alertMessage: "Shell updated"});
    } catch (error) {
      console.error(error);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to update shell!"});
    }
  });

  ipcMain.on("shell:select", async (event, shellDetails) => {
    try {
      selectedShell = shellDetails;
      selectedShell.os = await determineOS(selectedShell);
      const dir = await listWorkingDir(selectedShell);
      const dirName = await workingDir(selectedShell);
      event.reply("shell:select-reply", { shell: selectedShell, dir: dir, dirName: dirName });
    } catch (error) {
      console.error(error);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to load shell details!"});
    }
  });

  ipcMain.on("terminal:command", async (event, command) => {
    try {
      var output = await sendArbitraryCommand(selectedShell, command);
      output = parseMultiline(output);
      event.reply("terminal:command-reply", output);
    } catch(err) {
      console.log(err);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to send command!"});
    }
  });

  ipcMain.on("file:change-directory", async (event, directory) => {
    try {
      const newDir = `${directory.pwd}/${directory.dir}`;
      const listing = await listDir(selectedShell, newDir);
      console.log(listing);
      event.reply("file:change-dir-reply", listing);
    } catch(err) {
      console.log(err);
      event.reply("misc:alert", {alertType: "warning", alertMessage: "Failed to send command!"});
    }
  });

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
