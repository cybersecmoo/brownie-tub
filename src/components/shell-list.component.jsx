import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import ShellCreateForm from "./shell-create-form.component";
import "./shell-list.css";

class ShellList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			shells: []
		};
		this.handleFormClose = this.handleFormClose.bind(this);
		this.handleFormOpen = this.handleFormOpen.bind(this);

		window.ipcRenderer.on("shell:create-reply", (event, shell) => {
			console.log("New shell created");
			var shellsList = this.state.shells;
			shellsList.push(shell);
			this.setState({
				open: this.state.open,
				shells: shellsList
			});
		});
	}

	handleFormOpen() {
		this.setState({
			open: true,
			shells: this.state.shells
		});
	};

	handleFormClose() {
		this.setState({
			open: false,
			shells: this.state.shells
		});
	};

	render() {
		return (
			<div className="shell-list">
				<List component="nav" aria-label="shells">
					{
						this.state.shells.map((shell) => {
							return (
								<ListItem button>
									<ListItemIcon>
										<ComputerIcon />
									</ListItemIcon>
									<ListItemText primary={shell.ipOrHostname} />
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
			</div>
		);
	}
}

export default ShellList;