// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { getDatabase } = require("./db/setup-db");
const { sendRequest, determineOS, listDir } = require("./utils/requests");

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

  ipcMain.on("shell:create", async (event, shellDetails) => {
    try {
      await shellCollection.insert(shellDetails);
      event.reply("shell:create-reply", shellDetails);
    } catch (error) {
      console.error(error);
      event.reply("shell:create-error", error);
    }
  });

  ipcMain.on("shell:delete", async (event, shellDetails) => {
    try {
      const shell = await shellCollection.findOne().where("ipOrHostname").eq(shellDetails.ipOrHostname);
      await shell.remove();
      event.reply("shell:delete-reply");
    } catch (error) {
      console.error(error);
      event.reply("shell:delete-error", error);
    }
  });

  ipcMain.on("shell:update", async (event, shellDetails) => {
    try {
      const shell = await shellCollection.findOne().where("ipOrHostname").eq(shellDetails.ipOrHostname);
      await shell.update({$set: shellDetails});
    } catch (error) {
      console.error(error);
      event.reply("shell:delete-error", error);
    }
  });

  ipcMain.on("shell:select", async (event, shellDetails) => {
    try {
      // TODO: Admin determination
      shellDetails.os = await determineOS(shellDetails);
      const dir = await listDir(shellDetails);
      event.reply("shell:select-reply", { shell: shellDetails, dir: dir });
    } catch (error) {
      console.error(error);
      event.reply("shell:select-error", error);
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
