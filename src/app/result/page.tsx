import { createClient } from '../../../utils/supabase/server';
import {type} from "node:os";
import { saveData, fetchData } from "../../../utils/supabase/handledb";


async function Result() {
    const supabase = createClient();
    const { data: paragraph } = await supabase.from("paragraph").select("text").range(10, 30);
    return <pre>{JSON.stringify(paragraph, null, 2)}</pre>

}

export default Result;