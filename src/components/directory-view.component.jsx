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
										<ListItemText primary={entry.name} />
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