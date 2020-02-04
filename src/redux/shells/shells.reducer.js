import { SELECT_SHELL } from "../types";

const INITIAL_STATE = {
	selectedShell: {}
};

const shellsReducer = (currentState = INITIAL_STATE, action) => {
	switch(action.type) {
		case SELECT_SHELL:
			console.log("Returning");
			return {
				...currentState,
				selectedShell: action.payload
			};

		default:
			return currentState;
	}
}

export default shellsReducer;