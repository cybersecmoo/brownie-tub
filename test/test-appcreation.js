const TestHelper = require("./spectron-helper");
const app = TestHelper.initialiseSpectron();
const assert = require("assert");


describe("Window Creation", () => {
	beforeEach(() => {
		return app.start();
	});

	it("should create the window", () => {
		return app.client.getWindowCount().then((count) => {
			assert.equal(count, 1);
		})
	});

	it("should have a title BROWNIE TUB", () => {
		return app.client.getTitle().then((title) => {
			assert.equal(title, "BROWNIE TUB");
		});
	});

	afterEach(() => {
		if(app && app.isRunning()) {
			return app.stop();
		}
	});
});