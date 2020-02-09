const { SELECT_SHELL, DIR, OS } = require("../types");
const { sendRequest, determineOS, parseListDirResponse } = require("../../utils/utils");
const { LIST_DIR } = require("../../utils/reqTypes");

export const listCurrentDir = (shell) => async (dispatch) => {
	const data = await sendRequest(shell, LIST_DIR);
	const dir = parseListDirResponse(data, shell.os);

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
