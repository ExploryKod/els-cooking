import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    const supabase = createClient()

    const { name } = params
   
    const sectionsTexts :SectionTexts[] = [
        {
            id: "1",
            section_name: "project",
            section_lang: "fr",
            section_version: "1",
            section_pretitle: "Section Présentation",
            section_title: "Qui sommes nous?",
            section_text: "Texte de la section présentation"
        },
        {
            id: "1",
            section_name: "project",
            section_lang: "fr",
            section_version: "3",
            section_pretitle: "Section Présentation",
            section_title: "quad is lorem?",
            section_text: "Texte de la section présentation"
        },
        {
            id: "2",
            section_name: "members",
            section_lang: "fr",
            section_version: "1",
            section_pretitle: "Section Services",
            section_title: "Nos services",
            section_text: "Texte de la section services"
        }
    ]

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
