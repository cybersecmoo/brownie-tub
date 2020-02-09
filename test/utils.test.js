// Tests the utils functions
const utils = require("../src/utils/utils");
const assert = require("assert");

describe("Test utility functions", () => {
	it("Should identify a directory in a Windows listing", () => {
		const listing = "Volume in drive C has no label.\r\nVolume Serial Number is 721726\r\nDirectory of: C:\\xyz\\nnn\r\n01/01/2020  19:09    <DIR>          .\r\n";
		const dir = utils.parseListDirResponse(listing, "WINDOWS");
		const expected = [
			{
				type: "DIR",
				name: "."
			}
		];
		assert.equal(dir, expected);
	});
});