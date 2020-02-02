import { ipcRenderer } from "electron";

export const addShell = (shellDetails) =>  {
	ipcRenderer.send("shell:create", shellDetails);
};