import { MessageCreateForm } from '@/components/section/messageCreateForm'
import {getSectionTexts } from "@/app/actions/section/supabase/texts";

export default async function Page() {
    const data = await getSectionTexts();
    console.log('data from page', data)
    return (
        <main>
            <MessageCreateForm data={data}/>
        </main>
    );
}