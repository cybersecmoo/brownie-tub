export const LIST_DIR = "LIST_DIR";
export const GET_OS = "GET_OS";
export const GET_USER = "GET_USER";
export const COMMAND_MAP = {
	LIST_DIR: {
		WINDOWS: "dir",
		LINUX: "ls -la",
		MAC: "ls -la"
	},
	GET_OS: {
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