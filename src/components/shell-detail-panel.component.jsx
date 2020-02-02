import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";


class ShellDetailPanel extends Component {
	// TODO Take the selected shell from the Redux state
	render() {
		var title = "";

		if(this.props.shells.selectedShell !== undefined) {
			title = this.props.shells.selectedShell.ipOrHostname;
		}

		return (
			<div>
				<Typography variant="h2">{title}</Typography>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	shells: state.shells
});

export default connect(mapStateToProps, null)(ShellDetailPanel);