import React, { Component } from 'react';
import "./shell-list.css";
import { TextField } from '@material-ui/core';
import "./terminal.css";

const maxLines = 32;

class Terminal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terminalLines: [],
			currentCommand: ""
		};

		this.onSend = this.onSend.bind(this);
		this.handleChange = this.handleChange.bind(this);
		window.ipcRenderer.on("terminal:command-reply", (event, response) => {
			var termLines = this.state.terminalLines;
			var newCount = termLines.length;
			response.forEach(line => {
				newCount = termLines.push(line);
			});
			
			this.setState({...this.state, terminalLines: termLines});

			if(newCount > maxLines) {
				this.setState({...this.state, terminalLines: this.state.terminalLines.slice(1, maxLines + 1)});
			}
		});
	}

	onSend = (event) => {
		event.preventDefault();

		if(this.state.currentCommand !== "clear") {
			const command = this.state.currentCommand;
			this.setState({...this.state, currentCommand: ""});
			window.ipcRenderer.send("terminal:command", command);
		} else {
			this.setState({terminalLines: [], currentCommand: ""});
		}
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