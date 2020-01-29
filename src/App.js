import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
            <List component="nav" aria-label="victims">
              <ListItem button>
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText primary="192.168.0.1" />
              </ListItem>
            </List>
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
