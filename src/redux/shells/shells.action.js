import { SELECT_SHELL } from "../types";
import { listDirectoryRequest } from "../../utils";

export const listCurrentDir = (shell) => async (dispatch) => {
	// TODO send HTTP request via axios, parse the response, and dispatch with type DIR to save that directory layout
	await listDirectoryRequest(shell);
}

export const selectShell = shell => dispatch => {
	console.log(`Shell selected: ${shell}`);
	dispatch({
		type: SELECT_SHELL,
		payload: shell
	});
};
