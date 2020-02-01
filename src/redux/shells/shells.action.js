import { ipcRenderer } from "electron";

export const addShell = (shellDetails) => async dispatch => {
	ipcRenderer.send("shell:create", shellDetails);
};