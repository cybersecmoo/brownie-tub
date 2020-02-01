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
import { makeStyles } from '@material-ui/core/styles';
import "./shell-list.css";

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
	const [paramType, setParamType] = React.useState("");

	const handleSubmit = () => {
		console.log("Yay");
	}

	const handleChange = event => {
		setParamType(event.target.value);
	};

	return (
		<Dialog open={props.open} onClose={props.onClose}>
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
				<Button onClick={props.onClose} variant="contained" color="secondary">Cancel</Button>
				<Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
			</DialogActions>		
		</Dialog>
	);
};

export default ShellCreateForm;