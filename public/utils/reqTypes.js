const LIST_DIR = "LIST_DIR";
const GET_USER = "GET_USER";
const WORKING_DIR = "WORKING_DIR";
const COMMAND_MAP = {
	LIST_DIR: {
		WINDOWS: "dir",
		LINUX: "ls -la",
		MAC: "ls -la"
	},
	GET_USER: {
		WINDOWS: "whoami",
		LINUX: "whoami",
		MAC: "whoami"
	},
	WORKING_DIR: {
		WINDOWS: "cd",
		LINUX: "pwd",
		MAC: "pwd"
	}
};

module.exports = { LIST_DIR, GET_USER, WORKING_DIR, COMMAND_MAP };