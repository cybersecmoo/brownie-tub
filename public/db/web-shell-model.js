const WebShellSchema = {
	title: "web shell schema",
	description: "describes a web shell",
	version: 0,
	type: "object",
	properties: {
		ipOrHostname: {
			type: "string",
			primary: true
		},
		os: {
			type: "string"
		},
		isAdmin: {
			type: "boolean"
		}
	},
	required: ["ipOrHostname"]
}

module.exports = {
	WebShellSchema
};