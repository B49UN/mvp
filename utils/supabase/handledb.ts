import { createClient } from './server';

export async function saveData(inputValue: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('paragraph')
        .insert({text: inputValue})
    const { data: paragraph_id } = await supabase
        .from('paragraph')
        .select('paragraph_id')
        .eq('text', inputValue)

    if (error) {
        console.error('Error: ', error)
    }
    else {
        console.log('Saved data: ', data)
        console.log('Saved data id: ', paragraph_id)
    }
}

export async function fetchData(paragraph_id: number) {
    const supabase = createClient();
    let {data, error} = await supabase
        .from('analysis')
        .select('analysis')
        .eq('paragraph_id', paragraph_id)

    if (error) {
        console.log("Error: ", error)
    }
    else {
        console.log(data);
    }
}