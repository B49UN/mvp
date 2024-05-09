"use client";
import {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, {SwitchProps} from '@mui/material/Switch';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {createClient} from "@supabase/supabase-js";
import {saveData, fetchData} from "../../utils/supabase/handledb";


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
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
  const supabase = createClient("https://ddemkscuymbmverniybk.supabase.co/functions/v1/gpttest", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const toggleText = () => setIsHidden(!isHidden);
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async () => { // 분석된 data fetch
    try {
      const { data, error } = await supabase.functions.invoke('gpttest', {
        body: { sentence: inputValue }
      });

      if (error) {
        console.error('Error invoking Supabase function:', error);
        return;
      }

      console.log('Data received from Supabase:', data); // 분석된 data fetch
      localStorage.setItem('savedText', JSON.stringify(data)); // 분석된 data를 local storage가 아닌 supabase에 저장하도록 하기
    } catch (err) {
      console.error('An error occurred:', err);
    }

  }
  return (
      <main className="center-content flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold">ANSER</h1>
        // 굳이 버튼이 필요한가?
        <FormGroup row>
          <Button variant="contained" onClick={toggleText}>TEXT</Button>
          <Button variant="contained"
            onClick={() => (document.getElementById('fileInput') as HTMLInputElement)?.click()}>FILE</Button>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
          >
            Upload file
            <VisuallyHiddenInput type="file"/>
          </Button>
        </FormGroup>

        <input type="file" id="fileInput" className={`${isHidden ? 'hidden' : ''} mt-4`} accept=".pdf,image/*"
          onChange={(e) => console.log(e)}/>
        {isHidden ? null : (
            <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                  id="outlined-multiline-static"
                  label="문장 입력 칸"
                  multiline
                  rows={4}
                  value={inputValue} // 입력한 텍스트 값
                  onChange={ handleInputChange }
                  //defaultValue="여기에 문장을 입력하세요."
                />
            </Box>
        )}

          <div className="flex mt-4">

              <FormGroup row>
                  <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} label={"학습모드"} />
                  <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} label={"학습지"} />
              </FormGroup>

          </div>

          <div className="mt-4">
            <Button href={'/result'} variant={'contained'} onClick={handleSubmit}>Submit</Button>
          </div>

      </main>
  );
}
