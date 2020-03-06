const LIST_DIR = "LIST_DIR";
const GET_USER = "GET_USER";
const WORKING_DIR = "WORKING_DIR";
const COMMAND_MAP = {
	LIST_DIR: {
		WINDOWS: "dir",
		LINUX: "ls -la",
		MAC: "ls -la",
		args: 1
	},
	GET_USER: {
		WINDOWS: "whoami",
		LINUX: "whoami",
		MAC: "whoami",
		args: 0
	},
	WORKING_DIR: {
		WINDOWS: "cd",
		LINUX: "pwd",
		MAC: "pwd",
		args: 0
	}
};

module.exports = { LIST_DIR, GET_USER, WORKING_DIR, COMMAND_MAP };