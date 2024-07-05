import Button from "@mui/material/Button";
import {createClient} from "@supabase/supabase-js";
import React from "react";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const supabaseFtn = createClient(process.env.NEXT_PUBLIC_SUPABASE_EDGE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface SubmitButtonProps {
    inputValue: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ inputValue }) => {
    const handleSubmit = async () => {
        try {
            console.log("inputValue", inputValue);

            const sentenceArray: string[] = inputValue
                .split(/(?<=\S[.!?])(?=\s+|\n)/u)
                .map(sentence => sentence.trim())
                .filter(Boolean);


            console.log("stsArr", sentenceArray);

            const {data: paragraphData, error: paragraphError} = await supabase
                .from('paragraph')
                .insert({text: inputValue})
                .select();

            if (paragraphError) {
                console.error('Error inserting paragraph:', paragraphError);
                return;
            }
            const paragraphId = paragraphData[0].paragraph_id;

            const sentenceInserts = sentenceArray.map((sentence, index) => ({
                text: sentence,
                paragraph_id: paragraphId,
                order: index + 1,
            }));

            const { data: sentenceData, error: sentenceError } = await supabase
                .from('sentence')
                .insert(sentenceInserts)
                .select();

            if (sentenceError) {
                console.error('Error inserting sentences:', sentenceError);
                return;
            }

            for (const sentence of sentenceArray) {
                const index = sentenceArray.indexOf(sentence);
                const sentenceId = sentenceData[index].sentence_id;

                const { data: gptData, error: gptError } = await supabaseFtn.functions.invoke('gpttest', {
                    body: { sentence }
                });

                if (gptError) {
                    console.error('Error invoking Supabase function:', gptError);
                    continue; // Skip to the next sentence if there's an error
                }

                console.log(`Data received from Supabase for sentence "${sentence}":`, gptData);

                // Ensure gptData is parsed correctly
                let gptOutputJson;
                try {
                    gptOutputJson = typeof gptData === 'string' ? JSON.parse(gptData) : gptData;
                } catch (parseError) {
                    console.error('Error parsing GPT data:', parseError);
                    continue;
                     // Skip to the next sentence if there's a parsing error
                }

                const analysisInserts = {
                    paragraph_id: paragraphId,
                    sentence_id: sentenceId,
                    analysis: gptOutputJson,
                };

                const { data: analysisData, error: analysisError } = await supabase
                    .from('analysis')
                    .insert(analysisInserts)
                    .select();

                if (analysisError) {
                    console.error('Error inserting analysis:', analysisError);
                    return;
                }

            }


        } catch (err) {
            console.error('An error occurred:', err);
        }
    }

    return (
        <div className="mt-4">
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default SubmitButton;