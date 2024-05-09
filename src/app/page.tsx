"use client";
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, {SwitchProps} from '@mui/material/Switch';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {createClient} from "@supabase/supabase-js";


const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const supabaseFtn = createClient(process.env.NEXT_PUBLIC_SUPABASE_EDGE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const toggleText = () => setIsHidden(!isHidden);
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


    const handleSubmit = async () => {
        try {
            console.log(inputValue);
            const {data: gptData, error: gptError} = await supabaseFtn.functions.invoke('gpttest', {
                body: {sentence: inputValue}
            });

            if (gptError) {
                console.error('Error invoking Supabase function:', gptError);
                return;
            }

            console.log('Data received from Supabase:', gptData)

            let gptOutputJson;
            if (typeof gptData === 'string') {
                gptOutputJson = JSON.parse(gptData);
            } else {
                gptOutputJson = gptData;
            }

            const { data: paragraphData, error: paragraphError } = await supabase
                .from('paragraph')
                .insert({text: inputValue})

            {/*
            if (paragraphError || !paragraphData) {
                console.error('Error: ', paragraphError)
                return;
            }

            const paragraph_id = paragraphData[0]["paragraph_id"];
            */}
            const { data: analysisData, error: analysisError } = await supabase
                .from('analysis')
                .insert([
                    {first_id: 2, paragraph_id: 1005, sentence_id: 1, analysis: gptOutputJson},
                ])
            if (analysisError) {
                console.error('Error: ', analysisError)
                return;
            }

        } catch (err) {
            console.error('An error occurred:', err);
        }
    }

    return (
        <main className="center-content flex flex-col items-center justify-center p-4 pt-20">
            <h1 className="text-3xl font-bold">ANSER</h1>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-multiline-static"
                    label="문장 입력 칸"
                    multiline
                    rows={4}
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </Box>
            <input type="file" id="fileInput" className='mt-4' accept=".pdf,image/*"/>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
            >
                Upload file
                <VisuallyHiddenInput type="file"/>
            </Button>
            <div className="flex mt-4">

                <FormGroup row>
                    <FormControlLabel control={<IOSSwitch sx={{m: 1}}/>} label={"학습모드"}/>
                    <FormControlLabel control={<IOSSwitch sx={{m: 1}}/>} label={"학습지"}/>
                </FormGroup>

            </div>

            <div className="mt-4">
                <Button variant={'contained'} onClick={handleSubmit}>Submit</Button>
            </div>

        </main>
    );
}
