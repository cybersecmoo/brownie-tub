import shellReducer from "./shells/shells.reducer";
import { combineReducers } from "redux";

export default combineReducers({
	shells: shellReducer
});