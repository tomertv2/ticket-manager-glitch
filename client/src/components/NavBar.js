import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './Search';
import RestoreButton from './RestoreButton';
import SortButton from './SortButton';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar id="navBar">
          <Typography className={classes.title} variant="h6" noWrap>
            My Tickets Manager
          </Typography>
          <div className={classes.search}>
            <Search filterOnChangeFunc={props.filterOnChangeFunc} />
          </div>
          <SortButton sortByFunc={props.sortByFunc} />
          <div id="restoreContainer">
            <span>Restore </span>
            <span id="hideTicketsCounter">{props.countHiddenTickets.length}</span>
            <span> hidden tickets</span>
            <RestoreButton restoreFunc={props.restoreFunc} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
