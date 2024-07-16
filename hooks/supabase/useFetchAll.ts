import {createClient} from "@/utils/supabase/client";

export const useFetch = async (table:string) => {
    const supabase = createClient()

    const { data, error } = await supabase.from(table).select()

    return {
        data: data,
        error: error
    }
}