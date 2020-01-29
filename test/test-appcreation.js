const TestHelper = require("./spectron-helper");
const app = TestHelper.initialiseSpectron();
const assert = require("assert");


describe("Window Creation", () => {
	beforeEach(async () => {
		await app.start();
	});

	it("should create the window", async () => {
		await app.client.getWindowCount().then((count) => {
			assert.equal(count, 1);
		})
	});

	afterEach(async () => {
		if(app && app.isRunning()) {
			await app.stop();
		}
	});
});