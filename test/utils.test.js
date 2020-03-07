// Tests the utils functions
const utils = require("../public/utils/utils");
const assert = require("assert");

describe("Test directory parsing - Windows", () => {
	it("Should identify a directory in a Windows listing", () => {
		const listing = "Volume in drive C has no label.\r\nVolume Serial Number is 721726\r\nDirectory of: C:\\xyz\\nnn\r\n01/01/2020  19:09    <DIR>          .\r\n";
		const dir = utils.parseListDirResponse(listing, "WINDOWS");
		const expected = [
			{
				type: "DIR",
				name: "."
			}
		];
		assert.deepEqual(dir, expected);
	});

	it("Should identify a file in a Windows listing", () => {
		const listing = "Volume in drive C has no label.\r\nVolume Serial Number is 721726\r\nDirectory of: C:\\xyz\\nnn\r\n30/01/2020  20:19               264 appveyor.yml\r\n";
		const dir = utils.parseListDirResponse(listing, "WINDOWS");
		const expected = [
			{
				type: "FILE",
				name: "appveyor.yml"
			}
		];
		assert.deepEqual(dir, expected);
	});

	it("Should identify a file and a directory in a Windows listing", () => {
		const listing = "Volume in drive C has no label.\r\nVolume Serial Number is 721726\r\nDirectory of: C:\\xyz\\nnn\r\n07/02/2020  22:43    <DIR>          .vscode\r\n30/01/2020  20:19               264 appveyor.yml\r\n";
		const dir = utils.parseListDirResponse(listing, "WINDOWS");
		const expected = [
			{
				type: "DIR",
				name: ".vscode"
			},
			{
				type: "FILE",
				name: "appveyor.yml"
			}
		];
		assert.deepEqual(dir, expected);
	});
});

describe("Test directory parsing - Unix", () => {
	it("Should identify a directory in a Unix listing", () => {
		const listing = "total 42\ndrwxr-xr-x  3 lowuser lowuser 4096 Feb 16 01:01 .\ndrwxr-xr-x 17 lowuser lowuser 4096 Feb 16 01:01 ..\n";
		const dir = utils.parseListDirResponse(listing, "LINUX");
		const expected = [
			{
				type: "DIR",
				name: "."
			},
			{
				type: "DIR",
				name: ".."
			}
		];
		assert.deepEqual(dir, expected);
	});

	it("Should identify a file in a Unix listing", () => {
		const listing = "total 115\n-rwxr-xr-x 17 lowuser lowuser 4096 Feb 16 01:01 appveyor.yml\n";
		const dir = utils.parseListDirResponse(listing, "LINUX");
		const expected = [
			{
				type: "FILE",
				name: "appveyor.yml"
			}
		];
		assert.deepEqual(dir, expected);
	});

	it("Should identify a file and a directory in a Unix listing", () => {
		const listing = "total 10\ndrwxr-xr-x  3 lowuser lowuser 4096 Feb 16 01:01 .vscode\n-rwxr-xr-x 17 lowuser lowuser 4096 Feb 16 01:01 appveyor.yml\n";
		const dir = utils.parseListDirResponse(listing, "MAC");
		const expected = [
			{
				type: "DIR",
				name: ".vscode"
			},
			{
				type: "FILE",
				name: "appveyor.yml"
			}
		];
		assert.deepEqual(dir, expected);
	});
});

describe("Test working-directory name parsing", () => {
	it("Should identify the working directory name on Unix", () => {
		const listing = "/home/user/stuff/otherStuff\n";
		const dirName = utils.parseWorkingDir(listing);
		const expected = "/home/user/stuff/otherStuff";
		assert.equal(dirName, expected);
	});

	it("Should identify the working directory name on Windows", () => {
		const listing = "C:\\Users\\User\\Documents\\stuff\r\n\r\n";
		const dirName = utils.parseWorkingDir(listing);
		const expected = "C:\\Users\\User\\Documents\\stuff";
		assert.equal(dirName, expected);
	});
});

describe("Test conversion from relative to absolute paths", () => {
	it("Should return the correct path on Unix - parent dir", () => {
		const os = "LINUX";
		const currentDir = "/home/user/stuff/otherStuff";
		const newDirRelative = "..";
		const newDirAbs = utils.newDirRelativeToAbsolute(os, currentDir, newDirRelative);
		const expected = "/home/user/stuff";
		assert.equal(newDirAbs, expected);
	});

	it("Should return the correct path on Unix - current dir", () => {
		const os = "LINUX";
		const currentDir = "/home/user/stuff/otherStuff";
		const newDirRelative = ".";
		const newDirAbs = utils.newDirRelativeToAbsolute(os, currentDir, newDirRelative);
		const expected = "/home/user/stuff/otherStuff";
		assert.equal(newDirAbs, expected);
	});
	
	it("Should return the correct path on Unix - child dir", () => {
		const os = "LINUX";
		const currentDir = "/home/user/stuff/otherStuff";
		const newDirRelative = "childDir";
		const newDirAbs = utils.newDirRelativeToAbsolute(os, currentDir, newDirRelative);
		const expected = "/home/user/stuff/otherStuff/childDir";
		assert.equal(newDirAbs, expected);
	});

	it("Should return the correct path on Windows - parent dir", () => {
		const os = "WINDOWS";
		const currentDir = "C:\\Users\\user\\Documents\\subdir";
		const newDirRelative = "..";
		const newDirAbs = utils.newDirRelativeToAbsolute(os, currentDir, newDirRelative);
		const expected = "C:\\Users\\user\\Documents";
		assert.equal(newDirAbs, expected);
	});

	it("Should return the correct path on Windows - current dir", () => {
		const os = "WINDOWS";
		const currentDir = "C:\\Users\\user\\Documents\\subdir";
		const newDirRelative = ".";
		const newDirAbs = utils.newDirRelativeToAbsolute(os, currentDir, newDirRelative);
		const expected = "C:\\Users\\user\\Documents\\subdir";
		assert.equal(newDirAbs, expected);
	});
	
	it("Should return the correct path on Windows - child dir", () => {
		const os = "WINDOWS";
		const currentDir = "C:\\Users\\user\\Documents\\subdir";
		const newDirRelative = "childDir";
		const newDirAbs = utils.newDirRelativeToAbsolute(os, currentDir, newDirRelative);
		const expected = "C:\\Users\\user\\Documents\\subdir\\childDir";
		assert.equal(newDirAbs, expected);
	});
});