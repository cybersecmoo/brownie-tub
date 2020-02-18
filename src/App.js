import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ShellList from "./components/shell-list.component";
import ShellDetailPanel from "./components/shell-detail-panel.component";
import DirectoryView from "./components/directory-view.component";

const dark = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container>
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
      </div>
    </ThemeProvider>
  );
}

export default App;
