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
		this.handleShellSelect = this.handleShellSelect.bind(this);

		window.ipcRenderer.on("shell:create-reply", (event, shell) => {
			var shellsList = this.state.shells;
			shellsList.push(shell);
			this.setState({
				shells: shellsList
			});
		});

		window.ipcRenderer.on("shell:list-reply", (event, shells) => {
			this.setState({
				shells: shells
			});
		});

		window.ipcRenderer.on("shell:delete-reply", (event) => {
			var shellsList = this.state.shells;
			shellsList.splice(this.state.selectedIndex, 1);
			this.setState({
				shells: shellsList
			});
		});
	}

	componentDidMount = async () =>{
		window.ipcRenderer.send("shell:list");
	}

	handleFormOpen() {
		this.setState({
			open: true
		});
	};

	handleFormClose() {
		this.setState({
			open: false
		});
	};

	async handleShellSelect(shell) {
		try {
			window.ipcRenderer.send("shell:select", shell);
		} catch (error) {
			console.log(error);
		}
	}

	handleOpenAlert(index) {
		this.setState({
			alert: true,
			selectedIndex: index
		});
	}

	handleAlertClose() {
		this.setState({
			alert: false,
			selectedIndex: -1
		});
	}

	handleAcceptAlert() {
		window.ipcRenderer.send("shell:delete", this.state.shells[this.state.selectedIndex]);
		this.handleAlertClose();
	}

	render() {
		return (
			<div className="shell-list">
				<List component="nav" aria-label="shells">
					{
						this.state.shells.map((shell, index) => {
							return (
								<ListItem>
									<IconButton color="default" onClick={ () => this.handleShellSelect(shell) }>
										<ComputerIcon />
									</IconButton>
									<ListItemText primary={shell.ipOrHostname} />
									<IconButton color="secondary" onClick={ () => this.handleOpenAlert(index) }>
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
					</ListItem>
				</List>
				<ShellCreateForm open={this.state.open} onClose={this.handleFormClose} />
				<AlertDialog open={this.state.alert} onClose={this.handleAlertClose} onAccept={this.handleAcceptAlert} action="delete this shell" />
			</div>
		);
	}
}

export default ShellList;