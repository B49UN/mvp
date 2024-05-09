"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import { createClient } from '@supabase/supabase-js'
import {useEffect, useState} from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";


const drawerWidth = 240;
// const supabase = createClient();

function Study() {
    const [data, setData] = useState([]);
    const [drawerItems, setDrawerItems] = useState([]);
    {/*
    }ffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        let {data, error} = await supabase
            .from('analysis')
            .select('*')
            .eq('paragraph_id', 3)
        if (error) console.log("Error: ", error)
        else {
            setData(data);
            const items = data.map(item => item.sentence.split(' ').slice(0, 3).join(' '))
            setDrawerItems(items);
        }
    }*/}

    return (
        <Box sx={{ display: 'flex' }}>{/*
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {drawerItems.map((text, idnex) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() =>
                                    document.getElementById(`box-${index}`).scrollIntoView()}>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {/*
                        {['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {data.map((item, index) => (
                    <Box key={index} id={`box-${index}`}>
                        <Typography variant={"body1"}>{item.sentence}</Typography>
                    </Box>
                ))}
            </Box>*/}
        </Box>
    );
}

export default Study;
