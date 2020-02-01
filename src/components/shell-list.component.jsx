import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import "./shell-list.scss";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ShellList = () => {
  const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [paramType, setParamType] = React.useState("");

	const handleFormOpen = () => {
		setOpen(true);
	};

	const handleFormClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		console.log("Yay");
	}

	const handleChange = event => {
		setParamType(event.target.value);
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

			<Dialog open={open} onClose={handleFormClose}>
				<DialogContent>
					<DialogTitle>Register a New Shell</DialogTitle>
      		<FormControl className={classes.formControl}>
						<TextField autoFocus id="ipOrHostname" label="IP or URL" fullWidth />
					</FormControl>
					
					<FormControl className={classes.formControl}>
						<InputLabel id="commandParamType-label">Param Type</InputLabel>
						<Select
							labelId="commandParamType-label"
							id="commandParamType"
							value={paramType}
							onChange={handleChange}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={"header"}>Header</MenuItem>
							<MenuItem value={"cookie"}>Cookie</MenuItem>
							<MenuItem value={"POST"}>POST Param</MenuItem>
							<MenuItem value={"GET"}>GET Param</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleFormClose} variant="contained" color="secondary">Cancel</Button>
					<Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
				</DialogActions>		
			</Dialog>
			
		</div>
		
	);
}

export default ShellList;