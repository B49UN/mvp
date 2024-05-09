import { createClient } from '../../utils/supabase/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const paragraph_id = req.body.paragraph_id;
        const supabase = createClient();
        let {data, error} = await supabase
            .from('analysis')
            .select('analysis')
            .eq('paragraph_id', paragraph_id)

        if (error) {
            console.error('Error: ', error)
            res.status(500).json({ error: 'Failed to fetch data' })
        }
        else {
            console.log('Fetched data: ', data)
            res.status(200).json({ data })
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}