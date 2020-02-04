import React, { Component } from "react";
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
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import "./shell-list.css";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class ShellCreateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ipOrHostname: "",
			commandParamType: "",
			commandParam: "",
			passwordEnabled: false,
			passwordParam: "",
			password: "",
			os: "",
			isAdmin: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStringChanged = this.handleStringChanged.bind(this);
		this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
	}

	handleSubmit = () => {
		console.log(this.state);
		window.ipcRenderer.send("shell:create", this.state);
		this.props.onClose();
	}

	handleStringChanged = name => event => {
		this.setState({ ...this.state, [name]: event.target.value });
	}

	handleCheckboxChanged = name => event => {
		this.setState({ ...this.state, [name]: event.target.checked });
	}

	render = () => {
		const { classes } = this.props;

		return (
			<Dialog open={this.props.open} onClose={this.props.onClose}>
				<DialogContent>
					<DialogTitle>Register a New Shell</DialogTitle>
					<div>
						<FormControl className={classes.formControl}>
							<TextField autoFocus id="ipOrHostname" label="IP or URL" onChange={this.handleStringChanged("ipOrHostname")} fullWidth />
						</FormControl>
					</div>
					
					<div>
						<FormControl className={classes.formControl}>
							<InputLabel id="commandParamType-label">Param Type</InputLabel>
							<Select
								labelId="commandParamType-label"
								id="commandParamType"
								value={this.state.paramType}
								onChange={this.handleStringChanged("commandParamType")}
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
							<TextField id="commandParam" label="Command Parameter" onChange={this.handleStringChanged("commandParam")} fullWidth />
						</FormControl>
					</div>
	
					<div>
						<FormControlLabel control={
							<Checkbox checked={this.state.passwordEnabled} onChange={this.handleCheckboxChanged("passwordEnabled")} value="passwordEnabled" />
						} 
						label="Enable Password" />
					</div>
		
					<div>
						<FormControl className={classes.formControl}>
							<TextField id="passwordParam" label="Password Parameter" onChange={this.handleStringChanged("passwordParam")} fullWidth />
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField id="password" label="Password" onChange={this.handleStringChanged("password")} fullWidth />
						</FormControl>
					</div>
	
					<div>
						<FormControl className={classes.formControl}>
							<TextField id="os" label="Operating System" onChange={this.handleStringChanged("os")} fullWidth />
						</FormControl>
					</div>
	
					<div>
						<FormControlLabel control={
							<Checkbox checked={this.state.isAdmin} onChange={this.handleCheckboxChanged("isAdmin")} value="isAdmin" />
						} 
						label="Is Admin" />
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} variant="contained" color="secondary">Cancel</Button>
					<Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
				</DialogActions>		
			</Dialog>
		);
	}
}

ShellCreateForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShellCreateForm);