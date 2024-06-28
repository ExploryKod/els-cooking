import { getSectionTexts } from '@/app/actions/section/supabase/texts';

const MessageList = async () => {
    const { data } = await getSectionTexts();

    return (
        <>
            <ul>
                {data?.map((title) => (
                    <li key={title.id}>{title.section_title}</li>
                ))}
            </ul>
            <ul>
                {data?.map((text) => (
                    <li key={text.id}>{text.section_text}</li>
                ))}
            </ul>
        </>
    );
};

export { MessageList };