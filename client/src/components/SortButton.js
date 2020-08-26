import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Sort By</InputLabel>
        <Select
          native
          onChange={(e) => props.sortByFunc(e.target.value)}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={1}>Newest First</option>
          <option value={2}>Oldest First</option>
          <option value={3}>Mail A-Z</option>
          <option value={4}>Mail Z-A</option>
        </Select>
      </FormControl>
      <div><br /></div>
    </div>
  );
}
