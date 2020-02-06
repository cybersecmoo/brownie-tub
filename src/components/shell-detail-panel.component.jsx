import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import "./shell-details.css";

class ShellDetailPanel extends Component {
  render() {
    if (this.props.shells.selectedShell.ipOrHostname !== undefined && this.props.shells.selectedShell.ipOrHostname !== null) {
			const commandElement = (
					<Typography variant="p">
						Command {this.props.shells.selectedShell.commandParamType} param: {this.props.shells.selectedShell.commandParam}
					</Typography>
			);

			var passwordElement = null;

			if(this.props.shells.selectedShell.passwordEnabled === true) {
				passwordElement = (
					<Typography variant="p">
						Password param: {this.props.shells.selectedShell.passwordParam}
						<br />
						Password: {this.props.shells.selectedShell.password}
					</Typography>
				);
			}

			const osElement = (
				<Typography variant="p">
					OS: {this.props.shells.selectedShell.os}
					<br />
					Is Admin: {this.props.shells.selectedShell.isAdmin.toString()}
				</Typography>
			);
			
			// TODO make this a table?
			return (
				<div>
					<Typography variant="h3">{this.props.shells.selectedShell.ipOrHostname}</Typography>
					<br />
					{ commandElement }
					<br />
					{ passwordElement }
					<br />
					{ osElement }
				</div>
			);
    } else {
			return (<div></div>);
		}  
  }
}

const mapStateToProps = state => ({
  shells: state.shells
});

export default connect(mapStateToProps, null)(ShellDetailPanel);
