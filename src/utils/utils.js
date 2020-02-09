import axios from "axios";
import { COMMAND_MAP } from "./reqTypes";
import { WINDOWS, LINUX, MAC } from "./osTypes";

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
			encoded = btoa(command);
			break;
		default:
			console.error("Unsupported command encoding!");
			break;
	}

	return encoded;
}

const parseWindowsListDir = (listDirResponse) => {
	const lines = listDirResponse.split(/\r?\n/);
	var dir = [];

	for(line in lines) {
		// TODO Handle the current- and parent-directory entries
		var file = {
			type: "FILE",
			name: ""
		};

		if(line.includes("<DIR>")) {
			file.type = "DIR";
		}

		const nameRegex = /.*\s+([^\r\n]+)/gm;
		file.name = nameRegex.exec(line);

		dir.push(file);
	}

	return dir;
}

const parseUnixListDir = (listDirResponse) => {

	for(line in lines) {
		// TODO Handle the current- and parent-directory entries
		// TODO Determine whether or not the file is a directory (indicated by a `d` in the flags section)
	}

}

export const parseListDirResponse = (listDirResponse, os) => {
	if(os === WINDOWS) {
		parseWindowsListDir(listDirResponse);
	} else {
		parseUnixListDir(listDirResponse);
	}
}

export const determineOS = async (shell) => {
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

export const sendRequest = async (shell, reqType) => {
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

// TODO Make a fn to parse list-dir responses (using operating system info to determine how to work out which ones are dirs and which are files)