import * as React from 'react';
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import LoginIcon from '@mui/icons-material/Login';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from "next/link";


export function Menu() {
    const [open, setOpen] = React.useState(false);
    const items1 = [
        {text: "Log-In", icon: <LoginIcon/>, link: "/login"},
        {text: "Sign-In", icon: <InsertEmoticonIcon/>, link: "/register"},
    ];
    const items2 = [
        {text: "Subscribe", icon: <AddReactionIcon/>, link: "/"},
        {text: "Settings", icon: <SettingsIcon/>, link: "/"},
    ];

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {items1.map((item) => (
                    <Link href={item.link}>
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {items2.map((item) => (
                    <Link href={item.link}>
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#1976d2'}}>
            <Link href={"/"}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, mx: 1, color: 'white'}}>
                    ANSER
                </Typography>
            </Link>
            <Button sx={{color: 'white'}} onClick={toggleDrawer(true)}><MenuIcon/></Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
                {DrawerList}
            </Drawer>
        </div>
    );

}