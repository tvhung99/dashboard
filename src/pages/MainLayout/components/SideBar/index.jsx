import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { single , nested } from '../../../../menu-item/dashboard';
import Single from './List/Single';
import Nested from './List/Nested';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    }
  }));

SideBar.propTypes = {

};

function SideBar(props) {
    const classes = useStyles();
    return (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Dashboard
            </ListSubheader>
          }
          className={classes.root}
        >
            {
                single.map(link => <Single  key={link.id} icon={link.icon} link={link.link} name={link.name} />)
            }
            {
                nested.map(item => <Nested key={item.id} name={item.name} subitems={item.subitems} />)
            }
        </List>
      );
}

export default SideBar;