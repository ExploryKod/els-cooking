import {createClient} from "@/utils/supabase/client";

export const useFetch = async (columns: string[], table:string) => {
    const supabase = createClient()

    const { data, error } = await supabase.from(table).select(...columns)

    return {
        data: data,
        error: error
    }
}