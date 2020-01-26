module.exports = {
	"make_targets": {
		"win32": [
			"squirrel"
		],
		"darwin": [
			"dmg",
			"zip"
		],
		"linux": [
			"deb"
		]
	},
	"electronPackagerConfig": {
		"asar": true,
		"osxSign": true
	},
	"electronWinstallerConfig": {
		"name": "brownie-tub",
		"certificateFile": "brownie-cert.pfx",
		"certificatePassword": process.env["CERTIFICATE_PASSWORD"]
	},
	"electronInstallerDMG": {

	},
	"electronInstallerDebian": {

	},
	"electronInstallerRedhat": {
		
	}
}