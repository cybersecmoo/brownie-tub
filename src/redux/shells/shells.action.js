import { SELECT_SHELL, DIR, OS } from "../types";
import { sendRequest, determineOS } from "../../utils/utils";
import { LIST_DIR } from "../../utils/reqTypes";

export const listCurrentDir = (shell) => async (dispatch) => {
	const data = await sendRequest(shell, LIST_DIR);
	dispatch({
		type: DIR,
		payload: data
	});
}

export const getOSType = (shell) => async (dispatch) => {
	const os = await determineOS(shell);
	dispatch({
		type: OS,
		payload: os
	});
}

export const selectShell = shell => dispatch => {
	dispatch({
		type: SELECT_SHELL,
		payload: shell
	});
};
