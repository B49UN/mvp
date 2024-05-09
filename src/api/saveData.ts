import { createClient } from '../../utils/supabase/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { inputValue, gptOutput } = req.body;
        const supabase = createClient();

        let gptOutputJson;
        if (typeof gptOutput === 'string') {
            gptOutputJson = JSON.parse(gptOutput);
        } else {
            gptOutputJson = gptOutput;
        }

        const { data: paragraphData, error: paragraphError } = await supabase
            .from('paragraph')
            .insert({text: inputValue})
        if (paragraphError || !paragraphData) {
            console.error('Error: ', paragraphError)
            res.status(500).json({ error: 'Failed to insert data' })
            return;
        }

        const paragraph_id = paragraphData[0]["paragraph_id"];

        const { data: analysisData, error: analysisError } = await supabase
            .from('analysis')
            .insert({analysis: gptOutputJson, paragraph_id: paragraph_id})
        if (analysisError) {
            console.error('Error: ', analysisError)
            res.status(500).json({ error: 'Failed to insert data' })
            return;
        }


    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
