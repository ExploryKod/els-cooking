import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
import { sectionsTexts } from "@/app/memory/sections";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { name: string, version: string } }) {
    const supabase = createClient()

    const { name, version } = params
   
    function getTheSectionText(): SectionTexts | SectionTextError {
        if(sectionsTexts.find(sectionText => sectionText.section_version === version)) {
            const { ...data } = sectionsTexts.find(sectionText => sectionText.section_name === name && sectionText.section_version === version);
            return data;
        }    
        return {error: true, message: "La section nécessite une version et aucune n'a été trouvée"};
    }

    const result = getTheSectionText();

    try {
        console.log(name);
        revalidatePath(`/api/sections/${name}/${version}`);
        return NextResponse.json(result);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    } 
}
