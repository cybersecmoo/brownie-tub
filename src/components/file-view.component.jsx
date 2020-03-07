import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent } from '@material-ui/core';

class FileView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			fileName: "",
			textLines: []
		};

		window.ipcRenderer.on("file:view-reply", (event, response) => {
			this.setState({
				open: true,
				fileName: response.fileName,
				textLines: response.textLines
			});
		});

		this.handleClose = this.handleClose.bind(this);
	}

	handleClose = () =>{
		this.setState({
			...this.state,
			open: false
		});
	}

	render = () => {
		return (
			<Dialog open={this.state.open} onClose={this.handleClose}>
				<DialogContent>
					<DialogTitle>{this.state.fileName}</DialogTitle>
					{
						this.state.textLines.map(line => {
							return (<p>{line}</p>);
						})
					}
				</DialogContent>		
			</Dialog>
		);
	}
}

export default FileView;