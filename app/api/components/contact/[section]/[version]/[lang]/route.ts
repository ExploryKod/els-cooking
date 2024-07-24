import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
import { contactTexts } from "@/app/memory/contact";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { section:string , version: string, lang: string } }) {
    const supabase = createClient()

    const { section, version, lang } = params
   
    function getTheCardsText(): Partial<ContactTexts[]> | CardsTextError {
        
        const data = contactTexts.filter(c => (c?.contact_section === section) && (c.contact_version === version) && (c.contact_lang === lang)) 
        if(data.length > 0) {
            return data;
        } else {

            if(!section || !data.find(c => c?.contact_section === section)) {
                return {error: true, message: `Contact - Vous avez demandé des cards d'une catégorie invalide ou introuvable. Votre catégorie: ${section}`};
            }
            if(!version || !data.find(c => c?.contact_version === version)) {
                return {error: true, message: `Contact -Vous avez demandé une cards avec une section ${section}, mais la version est invalide ou introuvable. Votre version: ${version}`};
            }
            if(!lang || !data.find(c => c?.contact_lang === lang)) {
                return {error: true, message: `Contact - Vous avez demandé la section ${section},  mais la langue est invalide ou introuvable. Votre langue: ${lang}`};
            }

            return {error: true, message: `Contact - Vous avez demandé la section ${section}, la version ${version}, la langue ${lang} mais l'un de ces élèments est invalide ou non-disponible dans ce composant card`};
        } 
    }

    const result = getTheCardsText();

    try {
        
        revalidatePath(`/api/components/contact/${section}/${version}/${lang}`);
        return NextResponse.json(result);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    } 
}
