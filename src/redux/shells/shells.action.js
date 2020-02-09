import { SELECT_SHELL, DIR, OS } from "../types";
import { sendRequest, determineOS, parseListDirResponse } from "../../utils/utils";
import { LIST_DIR } from "../../utils/reqTypes";

export const listCurrentDir = (shell) => async (dispatch) => {
	const data = await sendRequest(shell, LIST_DIR);
	const dir = await parseListDirResponse(data, shell.os);

	dispatch({
		type: DIR,
		payload: dir
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
