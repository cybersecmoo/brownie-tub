import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import "./dirview.css";
import { Typography } from "@material-ui/core";
import ContextMenu from "react-context-menu";

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
      this.setState({ dirName: response.dirName, dir: response.dir });
    });

    this.handleDirClick = this.handleDirClick.bind(this);
    this.handleCreateFile = this.handleCreateFile.bind(this);
    this.handleCreateDir = this.handleCreateDir.bind(this);
  }

  handleDirClick = file => event => {
    event.preventDefault();

    if (file.type === "DIR") {
      window.ipcRenderer.send("file:change-directory", { dir: file.name, pwd: this.state.dirName });
    } else {
			// TODO Implement the electron side of this
			// TODO Implement the handler for the response (show a modal panel with the fie contents)
      window.ipcRenderer.send("file:view-file", { file: file.name, pwd: this.state.dirName });
    }
  };

	// TODO Implement this
  handleCreateFile = () => {};

	// TODO Implement this
  handleCreateDir = () => {};

  render() {
    return (
      <div>
        <Typography variant="h5">{this.state.dirName}</Typography>
        <List
          className="dir-view"
          aria-label="directory"
          contextId={"dir-area"}
          items={[
            { label: "Create File", onClick: this.handleCreateFile },
            { label: "Create Directory", onClick: this.handleCreateDir }
          ]}
        >
          {this.state.dir.map((entry, index) => {
            if (entry.type === "DIR") {
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
          })}
        </List>
      </div>
    );
  }
}

export default DirectoryView;
