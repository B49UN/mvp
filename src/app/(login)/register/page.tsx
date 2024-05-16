'use client';
import {createClient} from "@supabase/supabase-js";

function Register() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_EDGE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const handleSubmit = async () => {
        try {
            const {data: gptData, error: gptError} = await supabase.functions.invoke('gpttest', {
                body: {sentence: "This is sentence."},
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
    return(
        <div>
            <h4>
                Register page
            </h4>
            <h4>
                Register page
            </h4>
            <h4>
                Register page
            </h4>
            <h1 onClick={handleSubmit}>
                Click
            </h1>
        </div>
    )
}

export default Register;