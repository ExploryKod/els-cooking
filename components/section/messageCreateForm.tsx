'use client';

import { ReactNode } from "react";
import { createMessage } from '@/app/actions/section/supabase/texts';
import PrimaryButton from "@/components/PrimaryButton";
import { useFormStatus, useFormState } from 'react-dom';
import {EMPTY_FORM_STATE, FormState} from "@/utils/forms/getFormStateErrors";
import {FormErrorField} from "@/components/utilities/FormErrorsField";

type SubmitButtonProps = {
    label: string;
    loading: ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <>
        <PrimaryButton className={"items-center justify-center"} disabled={pending} type={"submit"}>
            {pending ? loading : label}
        </PrimaryButton>
    {/*<span className="text-xs text-red-400">*/}
    {/*             <FormErrorField formState={formState} name="title"/>*/}
    {/*        </span>*/}
        </>
    );
};
const MessageCreateForm = (props:any) => {

    return (
        <form action={createMessage} className="flex flex-col gap-y-2">
            <label htmlFor="section_title">Title</label>
            <input id="section_title" name="section_title" className="border-2 text-gray-800" />


            <label htmlFor="section_text">Text</label>
            <textarea id="section_text" name="section_text" className="border-2 text-gray-800" />
            <span className="text-xs text-red-400"></span>

            <SubmitButton label="Create" loading="Creating ..." />

            <span className="font-bold"></span>
        </form>
    )
};

export {MessageCreateForm};