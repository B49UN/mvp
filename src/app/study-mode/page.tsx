"use client";
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetchAnalysisData } from './DataFetchingComponent'
//import { Suspense } from 'react';

const drawerWidth = 240;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface AnalysisData {
    paragraph_id: number;
    sentence_id: number;
    sentence: string;
    analysis: any;
}

// const fetchAnalysisData = async (paragraph_id: number): Promise<AnalysisData[]> => {
//     const { data, error } = await supabase
//         .from('analysis')
//         .select('*')
//         .eq('paragraph_id',paragraph_id);

//     if (error) {
//         console.error("Error: ", error);
//         return [];
//     }

//     return data;
// };

const AnalysisList = ({ paragraph_id }: { paragraph_id: number }) => {
    const { data, loading } = useFetchAnalysisData(paragraph_id);
    console.log('analysis DAta')
    console.log(data)

    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    return (
      <List>
        {data.map((item : any, index : number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={item.sentence_id} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

const Study =  () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paragraph_id = searchParams.get('paragraph_id');
    const [data, setData] = React.useState<AnalysisData[]>([]);
    const [selectedAnalysis, setSelectedAnalysis] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchData =  () => {
            if (paragraph_id) {
                // const { data, error } = await supabase
                //     .from('analysis')
                //     .select('*')
                //     .eq('paragraph_id', Number(paragraph_id));

                // if (error) {
                //     console.error("Error: ", error);
                // } else {
                //     setData(data);
                // }
            }
        };

        fetchData();
    }, [paragraph_id]);

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
                    <AnalysisList paragraph_id={Number(paragraph_id)}/>
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
