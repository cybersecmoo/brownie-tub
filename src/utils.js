import axios from "axios";
import { WINDOWS } from "./osTypes";

export const listDirectoryRequest = async (shell) => {
	// TODO Set the password parameter, if required
	// TODO send the request and return the response
	var command = "ls -la";

	if(shell.os === WINDOWS) {
		command = "dir";
	}

	switch(shell.commandParamType) {
		case "header":
			const config = {
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
				}
			};
			config["headers"][shell.commandParam] = command;
			await axios.get(shell.ipOrHostname, config);
			break;
		case "cookie":

			break;
		case "POST":
			break;
		case "GET":
			break;
	}
}

// TODO Make a fn to parse list-dir responses (using operating system info to determine how to work out which ones are dirs and which are files)