import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';

const ShellList = () => {
	return (
		<List component="nav" aria-label="victims">
			<ListItem button>
				<ListItemIcon>
					<ComputerIcon />
				</ListItemIcon>
				<ListItemText primary="192.168.0.1" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<AddIcon />
				</ListItemIcon>
			</ListItem>
		</List>
	);
}

export default ShellList;