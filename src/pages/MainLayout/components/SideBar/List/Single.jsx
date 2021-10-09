import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink} from 'react-router-dom';
import icons from '../icons/icons';
import { makeStyles } from '@material-ui/core/styles';


Single.propTypes = {
    name : PropTypes.string,
    link : PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    link :{
        color :'black',
        fontWeight:'700'
    },
    active:{
        color : 'red'
    }
  }));

function Single({name , link , icon}) {
    const classes = useStyles();
    return (
        <ListItem component={NavLink} to={link} activeClassName={classes.active} className={classes.link} >
            <ListItemIcon>
              {icons[icon]}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
    );
}

export default Single;