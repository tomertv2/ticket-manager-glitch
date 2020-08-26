import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import HideButton from './HideButton';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Ticket(props) {
  const date = new Date(props.ticket.creationTime);
  const classes = useStyles();

  return (
    <>
      <div
        className={props.ticket.invisible ? 'hidden' : 'ticket'}
        style={{ display: props.ticket.invisible ? 'none' : 'block' }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h6" component="h4" className="ticketTopContainer" fontWeight="fontWeightMedium">
              <Typography className="title">
                {props.ticket.title}
              </Typography>
              <CardActions>
                <HideButton hideTicketFunc={props.hideTicketFunc} ticket={props.ticket} />
              </CardActions>
            </Typography>
            <Typography variant="body2" component="span">
              {props.ticket.content}
            </Typography>
            <Typography className="ticketBottomContainer" component="span">
              <Typography className="info" variant="caption" color="textSecondary">
                User:
                {' '}
                {props.ticket.userEmail}
                {' | '}
                {date.toISOString().replace(/T/g, ' ').replace(/Z/g, '')}
              </Typography>
              {(props.ticket.labels)
                    && (
                      <div>
                        {props.ticket.labels.map((label) => (
                          <Chip
                            className="label"
                            label={label}
                            color="primary"
                            size="small"
                            variant="outlined"
                            key={label}
                          />
                        ))}
                      </div>
                    )}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
