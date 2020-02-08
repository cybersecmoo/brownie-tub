import { SELECT_SHELL, DIR, OS } from "../types";

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
			// TODO fire off an IPC call to update the entry in the database
			return currentState;
		default:
			return currentState;
	}
}

export default shellsReducer;