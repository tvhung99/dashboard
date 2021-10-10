import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { single , nested } from '../../../../menu-item/dashboard';
import Single from './List/Single';
import Nested from './List/Nested';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router';
import {useCookies} from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxHeight: '100vh',
      backgroundColor: theme.palette.background.paper,
      overflowY : 'auto',
    }
  }));

SideBar.propTypes = {

};

function SideBar(props) {
    const classes = useStyles();
    const navigate = useNavigate()
    const [cookie , setCookie , removeCookie] = useCookies(['token','user']);
    const handleLogout = () =>{
      if(cookie){
        removeCookie('token');
        navigate('/login');
      }
    }

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

            <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" onClick={handleLogout} />
            </ListItem>
        </List>
      );
}

export default SideBar;