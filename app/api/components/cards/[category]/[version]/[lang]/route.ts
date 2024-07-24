import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
import { cardsContents } from "@/app/memory/cards";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { category:string ,versions: string, lang: string } }) {
    const supabase = createClient()

    const { category, versions, lang } = params
   
    function getTheCardsText(): CardsContents[] | CardsTextError {
        
        const data = cardsContents.filter(c => c.card_category === category)
        if(data.length > 0) {
            return data;
        }

        // if(cardsContents.find(item => (item.card_category === category))) {
        //     const { ...data } = cardsContents.find(item => (item.card_category === category));
        //     return data;
        // }  
        
        
        return {error: true, message: "Le composant card nécessite une version valide et une langue valide"};
    }

    const result = getTheCardsText();

    try {
        
        revalidatePath(`/api/components/cards/${category}/${versions}/${lang}`);
        return NextResponse.json(result);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    } 
}
