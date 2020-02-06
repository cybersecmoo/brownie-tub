import { SELECT_SHELL, DIR } from "../types";

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

		default:
			return currentState;
	}
}

export default shellsReducer;