"use client";
import {useState, useEffect} from "react";

import Button from '@mui/material/Button';
import {createClient} from "@supabase/supabase-js";




export default function Gpttest() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_EDGE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


    const handleSubmit = async () => {
        try {
            const {data: gptData, error: gptError} = await supabase.functions.invoke('gpttest', {
                body: {sentence: "This is sample sentence."},
            });

            if (gptError) {
                console.error('Error invoking Supabase function:', gptError);
                return;
            }

            console.log('Data received from Supabase:', gptData)
        } catch (err) {
            console.error('An error occurred:', err);
        }
    }

    return (


            <div>
                <h1>
                    1
                </h1>
                <h1>
                    1
                </h1>
                <Button variant={'contained'} onClick={handleSubmit}>Submit</Button>
            </div>

    );
}
