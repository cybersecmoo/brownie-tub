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
		const dbSuffix = new Date().getTime(); // we add a random timestamp in dev-mode to reset the database on each start
		const dbName = `${name + dbSuffix}`;
		const db = await RxDB.create({
			name: dbName,
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