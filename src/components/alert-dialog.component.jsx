import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

class AlertDialog extends Component {
	render = () => {
		return (
			<Dialog open={this.props.open} onClose={this.props.onClose}>
				<DialogTitle>Are You Sure?</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you wish to {this.props.action}?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={this.props.onClose} color="primary" autoFocus>No</Button>
					<Button variant="contained" color="secondary" onClick={this.props.onAccept}>Yes</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default AlertDialog;
