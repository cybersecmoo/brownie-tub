const TestHelper = require("./spectron-helper");
const app = TestHelper.initialiseSpectron;
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
chai.should();
chai.use(chaiAsPromised);

before(() => {
	chaiAsPromised.transferPromiseness = app.transferPromiseness;
	return app.start();
});

after(() => {
	if(app && app.isRunning()) {
		return app.stop();
	}
});