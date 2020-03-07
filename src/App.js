import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ShellList from "./components/shell-list.component";
import ShellDetailPanel from "./components/shell-detail-panel.component";
import DirectoryView from "./components/directory-view.component";
import { Component } from 'react';
import Terminal from "./components/terminal.component";

// TODO Remove all debug-type logging

const dark = createMuiTheme({
  palette: {
    type: "dark",
  },
});

class App extends Component {
  constructor(props) {
		super(props);
    this.state = {
      alertType: "success",
      alertMessage: "",
      showAlert: false
    };
		this.handleAlertClose = this.handleAlertClose.bind(this);

    window.ipcRenderer.on("misc:alert", (event, alert) => {
			this.setState({alertType: alert.alertType, alertMessage: alert.alertMessage, showAlert: true});
		});
  }

  handleAlertClose() {
    this.setState({...this.state, showAlert: false});
  }

  render() {
    return (
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <div className="main">
          <Grid container className="row1">
            <Grid item xs={2}>
              <ShellList />
            </Grid>
            <Grid item xs={8}>
              <DirectoryView />
            </Grid>
            <Grid item xs={2}>
              <ShellDetailPanel />
            </Grid>
          </Grid>
          <Grid container className="row2">
            <Grid item xs={2}>
            </Grid>         
            <Grid item xs={8}>
              <Terminal />
            </Grid>
            <Grid item xs={2}>
            </Grid>  
          </Grid>
          <Snackbar open={this.state.showAlert} autoHideDuration={6000} onClose={this.handleAlertClose}>
            <Alert severity={this.state.alertType} onClose={this.handleAlertClose}>
              {this.state.alertMessage}
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
