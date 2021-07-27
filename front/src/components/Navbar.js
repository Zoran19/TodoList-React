import React, {useState} from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import { NavLink } from "react-router-dom";
import {logout} from "../store/actions";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';





const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    // },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    menu:{
        "&:hover":{
            backgroundColor:"#16a085",
            color:"white"
        }
    },



}));




 function Navbar(props) {
     const [state,setState]=useState({logoutError:false});

     const  logout = async () => {
         try {
             await props.logout();
         } catch (e) {
             setState({ logoutError: true });
         }
     };

     const classes = useStyles();
     const theme = useTheme();
     const [open, setOpen] = React.useState(false);

     const handleDrawerOpen = () => {
         setOpen(true);
     };



     const handleDrawerClose = () => {
         setOpen(false);
     };
    return (
            <div className={classes.root} style={{marginBottom:"3%"}}>
                <CssBaseline />
                <AppBar position="static"  className={`${clsx(classes.appBar,{[classes.appBarShift]: open,})}`} style={{ background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar   >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            MA LISTE DE TACHES
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}

                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <MenuItem component={NavLink} to="/app/home" className={classes.menu}>
                            <ListItemIcon>
                                <SendIcon  />
                            </ListItemIcon>
                            <ListItemText primary="Ma liste" />
                        </MenuItem>
                        <MenuItem component={NavLink} to="/app/todo/create/todo" className={classes.menu}>
                            <ListItemIcon >
                                <AddBoxIcon  />
                            </ListItemIcon>
                            <ListItemText primary="Créer une tache" />
                        </MenuItem>
                    </List>
                    <Divider />
                    <List>
                        <MenuItem  component={NavLink} to="/app/SignUp" onClick={()=>{logout()}} className={classes.menu}>
                            <ListItemIcon >
                                <PowerSettingsNewIcon  />
                            </ListItemIcon>
                            <ListItemText primary="Déconnexion" />
                        </MenuItem>
                    </List>
                </Drawer>

            </div>






    );
}


const mapDispatchToProps = {
    logout,
};


export default connect (null,mapDispatchToProps)(Navbar);