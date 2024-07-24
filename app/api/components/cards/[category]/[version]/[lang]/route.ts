import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
import { cardsContents } from "@/app/memory/cards";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { category:string ,version: string, lang: string } }) {
    const supabase = createClient()

    const { category, version, lang } = params
   
    function getTheCardsText(): CardsContents[] | CardsTextError {
        
        const data = cardsContents.filter(c => (c.card_category === category) && (c.card_version === version) && (c.card_lang === lang)) 
        if(data.length > 0) {
            return data;
        } else {

            if(!category || !data.find(c => c.card_category === category)) {
                return {error: true, message: `Vous avez demandé des cards d'une catégorie invalide ou introuvable. Votre catégorie: ${category}`};
            }
            if(!version || !data.find(c => c.card_version === version)) {
                return {error: true, message: `Vous avez demandé une cards avec une catégorie ${category}, mais la version est invalide ou introuvable. Votre version: ${version}`};
            }
            if(!lang || !data.find(c => c.card_lang === lang)) {
                return {error: true, message: `Vous avez demandé la catégorie ${category},  mais la langue est invalide ou introuvable. Votre langue: ${lang}`};
            }

            return {error: true, message: `Vous avez demandé la catégorie ${category}, la version ${version}, la langue ${lang} mais l'un de ces élèments est invalide ou non-disponible dans ce composant card`};
        } 
    }

    const result = getTheCardsText();

    try {
        
        revalidatePath(`/api/components/cards/${category}/${version}/${lang}`);
        return NextResponse.json(result);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    } 
}
