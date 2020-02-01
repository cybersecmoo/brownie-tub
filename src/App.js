import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ShellList from "./components/shell-list.component";

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
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <ShellList />
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
