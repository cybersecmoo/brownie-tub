import { SELECT_SHELL, DIR, OS } from "../types";
import { ipcRenderer } from "electron";

const INITIAL_STATE = {
	selectedShell: {},
	dir: {}
};

const shellsReducer = (currentState = INITIAL_STATE, action) => {
	switch(action.type) {
		case SELECT_SHELL:
			return {
				...currentState,
				selectedShell: action.payload
			};

		case DIR:
			console.log("DIR");
			return {
				...currentState,
				dir: action.payload
			};

		case OS:
			console.log("OS");
			currentState.selectedShell.os = action.payload;
			ipcRenderer.send("shell:update", currentState.selectedShell);
			return currentState;
		default:
			return currentState;
	}
}

export default shellsReducer;