import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Folder from '@material-ui/icons/Folder';
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DirectoryView extends Component {
	render() {
		<List>
			{
				this.props.directoryListing.map((file) => {
					if(file.isFile) {
						return (
							<ListItem button>
								<ListItemIcon>
									<InsertDriveFile />
								</ListItemIcon>
								<ListItemText>file.name</ListItemText>
							</ListItem>
						);
					} else {
						return (
							<ListItem button>
								<ListItemIcon>
									<Folder />
								</ListItemIcon>
								<ListItemText>file.name</ListItemText>
							</ListItem>
						);
					}
				}
			)}
		</List>
	}
}

DirectoryView.propTypes = {
	directoryListing: PropTypes.object.isRequired,
};

// TODO: get `dir` from the redux state
export default connect(null, {  })(DirectoryView);