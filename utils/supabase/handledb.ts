import { createClient } from './server';

async function Handledb() {
    const supabase = createClient();
    const { data: paragraph } = await supabase.from("paragraph").select("text").range(10, 30);

}

export default Handledb;