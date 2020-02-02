import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShellCreateForm from "./shell-create-form.component";
import AlertDialog from "./alert-dialog.component";
import "./shell-list.css";

class ShellList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			alert: false,
			shells: [],
			selectedIndex: -1
		};
		this.handleFormClose = this.handleFormClose.bind(this);
		this.handleFormOpen = this.handleFormOpen.bind(this);
		this.handleOpenAlert = this.handleOpenAlert.bind(this);
		this.handleAlertClose = this.handleAlertClose.bind(this);
		this.handleAcceptAlert = this.handleAcceptAlert.bind(this);

		window.ipcRenderer.on("shell:create-reply", (event, shell) => {
			console.log("New shell created");
			var shellsList = this.state.shells;
			shellsList.push(shell);
			this.state.shells = shellsList;
		});
	}

	handleFormOpen() {
		this.state.open = true;
	};

	handleFormClose() {
		this.state.open = false;
	};

	handleOpenAlert(index) {
		this.state.selectedIndex = index;
	}

	handleAlertClose() {
		this.state.alert = false;
	}

	handleAcceptAlert() {
		window.ipcRenderer.send("shell:delete", this.state.shells[this.state.selectedIndex]);
	}

	render() {
		return (
			<div className="shell-list">
				<List component="nav" aria-label="shells">
					{
						this.state.shells.map((shell, index) => {
							return (
								<ListItem>
									<IconButton color="primary">
										<ComputerIcon />
									</IconButton>
									<ListItemText primary={shell.ipOrHostname} />
									<IconButton color="secondary" onClick={this.handleOpenAlert(index)}>
										<DeleteForeverIcon />
									</IconButton>
								</ListItem>
							);
						})
					}
	
					<ListItem button onClick={this.handleFormOpen}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary="Add New" />
					</ListItem>
				</List>
				<ShellCreateForm open={this.state.open} onClose={this.handleFormClose} />
				<AlertDialog open={this.state.alert} onClose={this.handleFormClose} onAccept={this.handleAcceptAlert} />
			</div>
		);
	}
}

export default ShellList;