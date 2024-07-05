import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { createClient } from '@supabase/supabase-js';

const drawerWidth = 240;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface AnalysisData {
    paragraph_id: number;
    sentence_id: number;
    sentence: string;
    analysis: any;
}

const fetchAnalysisData = async (): Promise<AnalysisData[]> => {
    const { data, error } = await supabase
        .from('analysis')
        .select('*')
        .eq('paragraph_id', 3);

    if (error) {
        console.error("Error: ", error);
        return [];
    }

    return data;
};

const Study = async () => {
    const data = await fetchAnalysisData();
    const [selectedAnalysis, setSelectedAnalysis] = React.useState<any>(null);

    const handleSentenceClick = (index: number) => {
        setSelectedAnalysis(data[index].analysis);
    };

    return (
        <Box sx={{ display: 'flex' }}>
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
                        {data.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handleSentenceClick(index)}>
                                    <ListItemText primary={item.sentence.split(' ').slice(0, 3).join(' ')} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {selectedAnalysis ? (
                    <Box>
                        <Typography variant="body1">
                            {JSON.stringify(selectedAnalysis, null, 2)}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1">Select a sentence to view its analysis</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Study;
