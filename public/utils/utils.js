const { WINDOWS, LINUX, MAC } = require("./osTypes");

const parseWindowsListDir = (listDirResponse) => {
	const lines = listDirResponse.split(/\r?\n/);
	var dir = [];

	for(const lineNo in lines) {
		// First three lines of content are gumph about the volume and the directory name
		if(lineNo < 3) {
			continue;
		}

		const line = lines[lineNo];
		var file = {
			type: "FILE",
			name: ""
		};

		const nameRegex = /.*\s+([^\r\n]+)/gm;
		const match = nameRegex.exec(line);

		if(match && match.length > 0) {
			file.name = match[1];
		}

		// this will break for directories named `<DIR>`, but that's a small risk, that I'm willing to take.
		if(line.includes("<DIR>") && !match.includes("<DIR>")) {
			file.type = "DIR";
		}

		if(file.name) {
			dir.push(file);
		}
	}

	return dir;
}

// NOTE This relies on parsing the output of `ls -la`, and is therefore not 100% reliable against crafted filenames. However, it should be fine against the vast 
//	majority of files. Just be aware. 
const parseUnixListDir = (listDirResponse) => {
	const lines = listDirResponse.split(/\r?\n/);
	var dir = [];

	for(const lineNo in lines) {
		// The first line in the output is the "total N" one, which we don't want.
		if(lineNo < 1) {
			continue;
		}
		
		const line = lines[lineNo];
		var file = {
			type: "FILE",
			name: ""
		};

		const nameRegex = /.*\s+([^\r\n]+)/gm;
		const match = nameRegex.exec(line);

		if(line.startsWith("d")) {
			file.type = "DIR";
		}

		if(match && match.length > 0) {
			file.name = match[1];
		}

		if(file.name) {
			dir.push(file);
		}
	}

	return dir;
}

const parseListDirResponse = (listDirResponse, os) => {
	var dir;

	if(os === WINDOWS) {
		dir = parseWindowsListDir(listDirResponse);
	} else {
		dir = parseUnixListDir(listDirResponse);
	}

	return dir;
}

module.exports = { parseListDirResponse };