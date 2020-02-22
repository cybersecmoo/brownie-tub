import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import "./dirview.css";

class DirectoryView extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			this.setState({dir: response.dir});
		});
	}

	render() {
		return (
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
		);
		
	}
}

export default DirectoryView;