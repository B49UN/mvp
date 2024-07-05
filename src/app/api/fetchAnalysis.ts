import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paragraphId = searchParams.get('paragraph_id');

    if (!paragraphId) {
        return NextResponse.json({ error: 'paragraph_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('analysis')
        .select('*')
        .eq('paragraph_id', parseInt(paragraphId, 10));

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
