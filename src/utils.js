import axios from "axios";

export const listDirectoryRequest = async (shell) => {
	// TODO construct the request, by taking the relevant list-dir command for the OS (i.e. `ls -la` or `dir`), and putting it in the appropriate commandParam
	// TODO send the request and return the response
}

// TODO Make a fn to parse list-dir responses (using operating system info to determine how to work out which ones are dirs and which are files)