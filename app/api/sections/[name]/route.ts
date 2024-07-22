import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
import { sectionsTexts } from "@/app/memory/sections";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    const supabase = createClient()

    const { name } = params
   
    function getTheSectionText(): SectionTexts | SectionTextError {
        if(sectionsTexts.find(sectionText => sectionText.section_version)) {
            const { ...data } = sectionsTexts.find(sectionText => 
                sectionText.section_name === name && 
                sectionText.section_version === sectionText.section_version);
            return data;
        }    
        return {error: true, message: "La section est introuvable : elle a toujours une version par défault et aucune version n'a été trouvée."};
    }
 
    try {
        console.log(name);
        revalidatePath(`/api/sections/${name}`);
        return NextResponse.json(getTheSectionText());
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    }

  
}
