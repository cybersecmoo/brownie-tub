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
		commandParamType: {
			type: "string",
			enum: ["header", "cookie", "POST", "GET"]
		},
		commandParam: {
			type: "string"
		},
		commandEncoding: {
			type: "string",
			enum: ["base64", "None"]
		},
		passwordEnabled: {
			type: "boolean",
			default: false
		},
		passwordParam: {
			type: "string"
		},
		password: {
			type: "string"
		},
		os: {
			type: "string"
		},
		isAdmin: {
			type: "boolean",
			default: false
		}
	},
	required: ["ipOrHostname", "commandParamType", "commandParam", "passwordEnabled", "isAdmin"]
}

module.exports = {
	WebShellSchema
};