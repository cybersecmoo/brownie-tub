const LIST_DIR = "LIST_DIR";
const GET_USER = "GET_USER";
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
	}
};

module.exports = { LIST_DIR, GET_USER, COMMAND_MAP };