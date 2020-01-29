const Application = require("spectron").Application;
const path = require("path");

class TestHelper {
	static initialiseSpectron() {
		console.log("Initialising Spectron");
		var electronPath = path.join(__dirname, "../node_modules", ".bin", "electron");
		const appPath = path.join(__dirname, "../public/");

		if(process.platform === "win32") {
			electronPath += ".cmd";
		}

		return new Application({
			path: electronPath,
			args: [appPath],
			env: {
				ELECTRON_ENABLE_LOGGING: true,
				ELECTRON_ENABLE_STACK_DUMPING: true,
				NODE_ENV: "development"
			},
			startTimeout: 20000,
			chromeDriverLogPath: "../chromedriverlog.txt"
		});
	}
}




module.exports = TestHelper;