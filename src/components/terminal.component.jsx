import React, { Component } from 'react';
import "./shell-list.css";
import { TextField } from '@material-ui/core';
import "./terminal.css";

const maxLines = 32;

class Terminal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terminalLines: [
				"hi",
				"bye"
			],
			currentCommand: ""
		};

		this.onSend = this.onSend.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onSend = (event) => {
		event.preventDefault();

		if(this.state.currentCommand !== "clear") {
			var newTermLines = this.state.terminalLines;
			const newLinesCount = newTermLines.push(this.state.currentCommand);
			this.setState({terminalLines: newTermLines, currentCommand: ""});

			if(newLinesCount > maxLines) {
				this.setState({terminalLines: this.state.terminalLines.slice(1, maxLines + 1), currentCommand: ""});
			}
		} else {
			this.setState({terminalLines: [], currentCommand: ""});
		}
		
		console.log(this.state);
	}

	handleChange = name => event => {
		this.setState({ ...this.state, [name]: event.target.value });
	}

	render() {
		return(
			<div className="terminal">
				{this.state.terminalLines.map(line => (<p>{line}</p>))}
				<form className="commandPrompt" onSubmit={this.onSend}>
					<span className="prompt">></span><TextField id="commandInput" className="commandInput" onChange={this.handleChange("currentCommand")} value={this.state.currentCommand} />
				</form>
			</div>
		);
	}
}

export default Terminal;