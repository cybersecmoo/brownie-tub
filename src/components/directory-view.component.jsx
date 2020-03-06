import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import "./dirview.css";
import { Typography } from "@material-ui/core";

class DirectoryView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dirName: "Directory",
			dir: [
				{
					type: "DIR",
					name: "exampleDir"
				},
				{
					type: "FILE",
					name: "exampleFile"
				}
			]
		};

		window.ipcRenderer.on("shell:select-reply", (event, response) => {
			this.setState({dirName: response.dirName, dir: response.dir});
		});

		this.handleDirClick = this.handleDirClick.bind(this);
	}

	handleDirClick = (file) => (event) => {
		event.preventDefault();

		if(file.type === "DIR") {
			window.ipcRenderer.send("file:change-directory", {dir: file.name, pwd: this.state.dirName});
		} else {

		}
		// TODO For files: show some form of modal panel? Or context menu of some sort
	}

	render() {
		return (
			<div>
				<Typography variant="h5">{this.state.dirName}</Typography>
				<List className="dir-view" aria-label="directory">
					{
						this.state.dir.map((entry, index) => {
							if(entry.type === "DIR") {
								return (
									<ListItem button>
										<FolderIcon />
										<ListItemText primary={entry.name} onClick={this.handleDirClick(entry)} />
									</ListItem>
								);
							} else {
								return (
									<ListItem button>
										<FileIcon />
										<ListItemText primary={entry.name} />
									</ListItem>
								);
							}
							
						})
					}
				</List>
			</div>
			
		);
		
	}
}

export default DirectoryView;