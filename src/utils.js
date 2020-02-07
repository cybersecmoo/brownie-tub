import axios from "axios";
import { WINDOWS } from "./osTypes";

const generateConfig = (shell, command) => {
	var config = {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
		}
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
	}
	
	console.log(config);
	return config;
}

export const listDirectoryRequest = async (shell) => {
	var command = "ls -la";

	if(shell.os === WINDOWS) {
		command = "dir";
	}

	const config = generateConfig(shell, command);
	var response;

	if(shell.commandParamType === "POST") {
		response = await axios.post(shell.ipOrHostname, config);
	} else {
		response = await axios.get(shell.ipOrHostname, config);
	}

	return response;
}

// TODO Make a fn to parse list-dir responses (using operating system info to determine how to work out which ones are dirs and which are files)