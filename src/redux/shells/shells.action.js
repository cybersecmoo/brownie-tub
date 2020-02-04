import { SELECT_SHELL } from "../types";

export const selectShell = shell => dispatch => {
	console.log(`Shell selected: ${shell}`);
	dispatch({
		type: SELECT_SHELL,
		payload: shell
	});
};
