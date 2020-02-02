import React from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
//import { ipcRenderer } from "electron";
import "./shell-list.css";

//const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ShellCreateForm = (props) => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		ipOrHostname: "",
		paramType: "",
		commandParam: "",
		passwordEnabled: false,
		passwordParam: "",
		password: "",
		os: "",
		isAdmin: false
	});

	const handleSubmit = () => {
		console.log(state);
		window.ipcRenderer.send("shell:create", state);
		props.onClose();
	}

	const handleStringChanged = name => event => {
		setState({ ...state, [name]: event.target.value });
	}

	const handleCheckboxChanged = name => event => {
		setState({ ...state, [name]: event.target.checked });
	}

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogContent>
				<DialogTitle>Register a New Shell</DialogTitle>
				<div>
					<FormControl className={classes.formControl}>
						<TextField autoFocus id="ipOrHostname" label="IP or URL" onChange={handleStringChanged("ipOrHostname")} fullWidth />
					</FormControl>
				</div>
				
				<div>
					<FormControl className={classes.formControl}>
						<InputLabel id="commandParamType-label">Param Type</InputLabel>
						<Select
							labelId="commandParamType-label"
							id="commandParamType"
							value={state.paramType}
							onChange={handleStringChanged("paramType")}
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
					<FormControl className={classes.formControl}>
						<TextField id="commandParam" label="Command Parameter" fullWidth />
					</FormControl>
				</div>

				<div>
					<FormControlLabel control={
						<Checkbox checked={state.passwordEnabled} onChange={handleCheckboxChanged("passwordEnabled")} value="passwordEnabled" />
					} 
					label="Enable Password" />
				</div>
	
				<div>
					<FormControl className={classes.formControl}>
						<TextField id="passwordParam" label="Password Parameter" onChange={handleStringChanged("passwordParam")} fullWidth />
					</FormControl>
					<FormControl className={classes.formControl}>
						<TextField id="password" label="Password" onChange={handleStringChanged("password")} fullWidth />
					</FormControl>
				</div>

				<div>
					<FormControl className={classes.formControl}>
						<TextField id="os" label="Operating System" onChange={handleStringChanged("os")} fullWidth />
					</FormControl>
				</div>

				<div>
					<FormControlLabel control={
						<Checkbox checked={state.isAdmin} onChange={handleCheckboxChanged("isAdmin")} value="isAdmin" />
					} 
					label="Is Admin" />
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} variant="contained" color="secondary">Cancel</Button>
				<Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
			</DialogActions>		
		</Dialog>
	);
};

export default ShellCreateForm;