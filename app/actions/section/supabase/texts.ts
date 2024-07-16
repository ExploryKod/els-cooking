"use server"

import {useInsert} from "@/hooks/supabase/useInsert";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {getFormStateError} from "@/utils/forms/getFormStateErrors";
import { toFormState } from "@/utils/forms/getFormStateErrors";
import {createClient} from "@/utils/supabase/client";
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {redirect} from "next/navigation";

const createMessageSchema = z.object({
    section_text: z.string().min(1).max(191),
    section_title: z.string().min(1).max(191),
});

export const getSectionTexts = async (): Promise<PostgrestSingleResponse<SectionTexts[]>> => {
    const supabase = createClient()
    const data = await supabase.from('sections').select()

    return {
        ...data
    }
};

export const createMessage = async (formData: FormData) => {

    const { section_text, section_title} = createMessageSchema.parse({
        section_text: formData.get("section_text"),
        section_title: formData.get("section_title")
    });

    try {
        const { error } = await useInsert({
            section_text: section_text,
            section_title: section_title,
        })

    } catch (error) {
        return getFormStateError(error)
    }

    revalidatePath('/');
    redirect('/section/create');

};




