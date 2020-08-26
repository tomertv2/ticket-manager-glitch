import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function HideButton(props) {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <IconButton
        className="hideTicketButton "
        aria-label="delete"
        size="small"
        onClick={() => props.hideTicketFunc(props.ticket)}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </span>
  );
}
