const RxDB = require("rxdb");
const { WebShellSchema } = require("./web-shell-model");
RxDB.plugin(require("pouchdb-adapter-node-websql"));

let _getDatabase;

const getDatabase = (name, adapter) => {
	if(!_getDatabase) {
		_getDatabase = createDatabase(name, adapter);

		return _getDatabase;
	}
}

const createDatabase = async (name, adapter) => {
	try {
		const db = await RxDB.create({
			name: name,
			adapter: adapter
		});

		await db.collection({
			name: "shells",
			schema: WebShellSchema
		});

		return db;
	} catch (error) {
		console.log(error);
	}
	
}

module.exports = {
	getDatabase
};