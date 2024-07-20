import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
export const dynamic = 'force-dynamic' 

export async function GET(req: NextRequest) {
    //const supabase = createClient()

    try {
        //const { data } = await supabase.from('members').select()
        //console.log(data);
        revalidatePath('/api/projects');

        const data: Person[] = [
            {
                nom: 'Kpeglo Bessou',
                prenom: 'Kokou Jacques',
                img: { src: './assets/img/persons/persons-man.jpg', alt: 'personne' },
                email: 'email@mail.com',
                role: 'Président du Conseil d\'Administration'
            },
            {
                nom: 'Azanli',
                prenom: 'Koffi Djifa',
                img: { src: './assets/img/persons/persons-man.jpg', alt: 'personne' },
                email: 'email@mail.com',
                role: 'Directeur exécutif'
            },
            {
                nom: 'Dewa Kassa',
                prenom: 'Kodjo Akonta Florent',
                img: { src: './assets/img/persons/persons-man.jpg', alt: 'personne' },
                email: 'email@mail.com',
                role: 'Responsable planification et suivi'
            },
            {
                nom: 'Tate',
                prenom: 'Yawo Akponi',
                img: { src: './assets/img/persons/persons-man.jpg', alt: 'personne' },
                email: 'email@mail.com',
                role: 'Coordonnateur de l\'association'
            }
        ];

        return NextResponse.json(data);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    }


}