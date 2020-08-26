import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function RestoreButton(props) {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <IconButton
        id="restoreHideTickets"
        aria-label="delete"
        size="small"
        onClick={() => props.restoreFunc()}
      >
        <CachedIcon />
      </IconButton>
    </span>
  );
}
