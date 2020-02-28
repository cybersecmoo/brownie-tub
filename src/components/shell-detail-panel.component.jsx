import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import "./shell-details.css";

class ShellDetailPanel extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			selectedShell: null
		};	

		window.ipcRenderer.on("shell:select-reply", (event, response) => {
			this.setState({selectedShell: response.shell});
		});
	}

  render() {
    if (this.state.selectedShell !== null) {
			const commandElement = (
					<Typography variant="p">
						Command {this.state.selectedShell.commandParamType} param: {this.state.selectedShell.commandParam} (encoded with {this.state.selectedShell.commandEncoding})
					</Typography>
			);

			var passwordElement = null;

			if(this.state.selectedShell.passwordEnabled === true) {
				passwordElement = (
					<Typography variant="p">
						Password param: {this.state.selectedShell.passwordParam}
						<br />
						Password: {this.state.selectedShell.password}
					</Typography>
				);
			}

			const osElement = (
				<Typography variant="p">
					OS: {this.state.selectedShell.os}
					<br />
					Is Admin: {this.state.selectedShell.isAdmin.toString()}
				</Typography>
			);
			
			return (
				<div>
					<Typography variant="h3">{this.state.selectedShell.ipOrHostname}</Typography>
					<br />
					{ commandElement }
					<br />
					{ passwordElement }
					<br />
					{ osElement }
				</div>
			);
    } else {
			return (
				<div>
					<Typography variant="h5">Details</Typography>
				</div>);
		}  
  }
}

export default ShellDetailPanel;
