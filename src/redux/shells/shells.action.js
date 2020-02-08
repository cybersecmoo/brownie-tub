import { SELECT_SHELL, DIR } from "../types";
import { sendRequest } from "../../utils/utils";
import { LIST_DIR } from "../../utils/reqTypes";

export const listCurrentDir = (shell) => async (dispatch) => {
	const data = await sendRequest(shell, LIST_DIR);
	dispatch({
		type: DIR,
		payload: data
	});
}

export const selectShell = shell => dispatch => {
	dispatch({
		type: SELECT_SHELL,
		payload: shell
	});
};
