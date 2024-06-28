import {createClient} from "@/utils/supabase/client";

export const useInsertToSupabase = async (props:any) => {
    const supabase = createClient()
    const { error } = await supabase.from('sections').insert([
        {
            ...props
        },
    ])

    return {
        error: error
    }
}