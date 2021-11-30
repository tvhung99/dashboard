import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import userApi from '../../../../api/userApi';
import { nested } from '../../../../menu-item/dashboard';
import Nested from './List/Nested';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxHeight: '100vh',
      backgroundColor: theme.palette.background.paper,
      overflowY : 'auto',
      '& *':{
        color:'rgba(100,100,100,1)',
        fontWeight : 700
      }
    }
  }));

SideBar.propTypes = {

};

function SideBar(props) {
    const token = useSelector((state) => state.auth.token);
    const classes = useStyles();
    const navigate = useNavigate()
    const handleLogout = async () =>{
      if(token){
        await userApi.logout({
            headers : {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': "*",
              "Authorization":"Bearer "+ token,
          }
        })
        navigate('/login');
      }
    }

    return (
        <List
          style={{background:'#def3fd' ,height:'100%' , minHeight:'vh'}}
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