import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
      color:'black',
      fontWeight:'700'
    },
  }));

Nested.propTypes = {
    subitems : PropTypes.array.isRequired,
    name : PropTypes.string,
};

function Nested({name , subitems}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        subitems.map(item => (
                            <ListItem key={item.id}  component={NavLink} to={item.link} className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}

export default Nested;