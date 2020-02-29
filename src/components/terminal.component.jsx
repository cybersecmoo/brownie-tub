import React, { Component } from 'react';
import "./shell-list.css";
import { TextField } from '@material-ui/core';
import "./terminal.css";

class Terminal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terminalLines: "hi\r\nhi\r\n"
		};
	}

	onSend(event) {
		event.preventDefault();
	}

	render() {
		return(
			<div className="terminal">
				<TextField multiline disabled fullWidth variant="outlined" rows="10" maxRows="30">{this.state.terminalLines}</TextField>
				<TextField fullWidth size="small" variant="outlined"></TextField>
			</div>
		);
	}
}

export default Terminal;