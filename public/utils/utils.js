const { WINDOWS, LINUX, MAC } = require("./osTypes");

/** 
 * Uses a regex to split the input into its component lines
 * 
 * @param {String} multilineInput The data to split
 * @exports 
 */
const parseMultiline = (multilineInput) => {
	const lines = multilineInput.split(/\r?\n/);
	return lines;
}

const parseWindowsListDir = (listDirResponse) => {
	const lines = parseMultiline(listDirResponse);
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
	const lines = parseMultiline(listDirResponse);
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

/** 
 * Parses a directory listing, for Windows and Unix platforms
 * 
 * @param {Object} listDirResponse The output of the directory listing command
 * @param {String} os The operating system used on the target
 * @exports 
 */
const parseListDirResponse = (listDirResponse, os) => {
	var dir;

	if(os === WINDOWS) {
		dir = parseWindowsListDir(listDirResponse);
	} else {
		dir = parseUnixListDir(listDirResponse);
	}

	return dir;
}

/** 
 * Parses the output of a working-directory request
 * 
 * @param {Object} workingDirResponse The output of the request to get the working directory
 * @exports 
 */
const parseWorkingDir = (workingDirResponse) => {
	const lines = parseMultiline(workingDirResponse);
	return lines[0];
}

/**
 * Parses a requested new directory, and the current directory to which the new one is relative, to find the path of the new directory
 * 
 * @param {String} os					The operating system, as defined in `osTypes.js`
 * @param {String} currentDir The directory at which we are currently looking
 * @param {String} newDirRel  The new directory's path, relative to `currentDir`
 * @returns {String} The new directory's absolute path
 * @exports
 */
const newDirRelativeToAbsolute = (os, currentDir, newDirRel) => {
	var absDir = "";
	var fileSep = "/";

	if(os === WINDOWS) {
		fileSep = "\\";
	}

	var dirStructure = currentDir.split(fileSep);

	if(newDirRel === "..") {
		dirStructure = dirStructure.slice(0, -1);
	} else if(newDirRel !== ".") {
		dirStructure.push(newDirRel);
	}

	absDir = dirStructure.join(fileSep);

	return absDir;
}

module.exports = { parseMultiline, parseListDirResponse, parseWorkingDir, newDirRelativeToAbsolute };