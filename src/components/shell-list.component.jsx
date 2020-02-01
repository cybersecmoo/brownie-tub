import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import ShellCreateForm from "./shell-create-form.component";
import "./shell-list.css";

const ShellList = () => {
	const [open, setOpen] = React.useState(false);

	const handleFormOpen = () => {
		setOpen(true);
	};

	const handleFormClose = () => {
		setOpen(false);
	};

	return (
		<div className="shell-list">
			<List component="nav" aria-label="victims">
				<ListItem button>
					<ListItemIcon>
						<ComputerIcon />
					</ListItemIcon>
					<ListItemText primary="192.168.0.1" />
				</ListItem>
				<ListItem button onClick={handleFormOpen}>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary="Add New" />
				</ListItem>
			</List>
			<ShellCreateForm open={open} onClose={handleFormClose} />					
		</div>
		
	);
}

export default ShellList;