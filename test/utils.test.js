// Tests the utils functions
const utils = require("../src/utils/utils");
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
		const listing = "";
		const dir = utils.parseListDirResponse(listing, "LINUX");
		const expected = [
			{
				type: "DIR",
				name: "."
			}
		];
		assert.deepEqual(dir, expected);
	});

	it("Should identify a file in a Unix listing", () => {
		const listing = "";
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
		const listing = "";
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