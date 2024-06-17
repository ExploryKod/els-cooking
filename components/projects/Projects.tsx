import React, {useEffect, useRef, useState} from 'react';

import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import StepperIndicators from "@/components/StepperIndicators";
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProjectsList from "@/components/projects/ProjectsList";
import {showToast} from "@/utils/toastify/showToast";

dayjs.locale('fr-FR');
dayjs.extend(relativeTime);

export default function Index() {

    const [editing, setEditing] = useState({on:false, object:{}});

    useEffect(() => {
        showToast('success', "")

    }, [])

    const STEPS_TEXTS = [
        { id: 0, text: "Vignette" },
        { id: 1, text: "Contenu (I)" },
        { id: 2, text: "Contenu (II)" }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const goToStep = (step: number) => setCurrentStep(step);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        user_id: 1,
        project_date: '',
        project_place: '',
        project_category: '',
        project_title: '',
        project_extract: '',
        project_teaser: '',
        project_description: '',
        project_goal: '',
        project_method: '',
        project_results: '',
        project_single_url: '',
        project_img_url: '',
        project_img_name: '',
        project_infos: {},
        project_meta: {},
        project_publish_status: '',
    });

    const submit = (e) => {
        e.preventDefault();
        try {
            post(route('cooking-projects.store'), { onSuccess: () => reset() });
        } catch(error) {
            console.log(error)
        }

    };

    const modify = (e) => {
        e.preventDefault();

        // Filter out null values
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== null && value !== '')
        );

        console.log('Filtered Data:', filteredData);

        try {
            patch(route('cooking-projects.update', editing?.object?.id), {
                data: filteredData,
                onSuccess: () => setEditing({ on: false, object: {} })
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
            <section className="max-w-7xl mx-auto flex flex-wrap">
                <div className="min-w-[300px] p-4 sm:p-6 lg:p-8">
                    <form onSubmit={editing.on ? modify : submit} className="h-[400px] max-w-lg flex flex-col gap-5">
                        <StepperIndicators currentStep={currentStep} />
                        <section className="w-full my-2 flex gap-10">
                            {STEPS_TEXTS.map((step) => (
                                <button
                                    type={"button"}
                                    key={step.id}
                                    onClick={() => goToStep(step.id)}
                                    className={`${step.id === currentStep ? "bg-green-500" : ""}  hover:opacity-60 bg-blue-600 text-white p-2 rounded-md`}
                                >
                                    {step.text}
                                </button>
                            ))}
                        </section>
                        <div
                            className={currentStep === 0 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden"}>
                        </div>
                        <div
                            className={currentStep === 1 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden"}>
                            <textarea
                                value={data.project_extract}
                                placeholder="Donner un extrait pour les vignettes du projet ici"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_extract', e.target.value)}
                            />
                            <textarea
                                value={data.project_description}
                                placeholder="Décrivez l'objet du projet ici"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_description', e.target.value)}
                            />
                            <textarea
                                value={data.project_goal}
                                placeholder="Décrivez les objectifs du projet ici"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_goal', e.target.value)}
                            />

                        </div>
                        <div
                            className={currentStep === 2 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden"}>
                             <textarea
                                 value={data.project_results}
                                 placeholder="Parlez-nous des impacts du projet (résultats)"
                                 className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                 onChange={e => setData('project_results', e.target.value)}
                             />
                            <select
                                value={data.project_category}
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_category', e.target.value)}
                            >
                                <option value="hygiène">Hygiène</option>
                                <option value="education">Education</option>
                                <option value="autre" defaultValue>Autre</option>
                            </select>
                            <label> Voulez-vous créer un brouillon avant publication ? </label>
                            <select
                                value={data.project_publish_status}
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_publish_status', e.target.value)}
                            >
                                <option value="published" defaultValue>Publié</option>
                                <option value="draft">Brouillon</option>
                            </select>
                        </div>
                        {Object.keys(errors).map((errorField) => (
                            <InputError key={errorField} message={errors[errorField]} className="mt-2"/>
                        ))}
                        <PrimaryButton
                            className={`mt-4 justify-center ${!editing.on && currentStep !== 2 ?  "opacity-50 pointer-events-none" : "opacity-100"}`}
                            disabled={processing}>
                            {editing.on ? 'Modifier ce projet' : 'Créer un projet'}
                        </PrimaryButton>
                        {!editing.on ? <span className={'text-xs text-gray-600'}>Cliquez sur la dernière étape pour valider le projet.</span> : null}
                    </form>
                    {editing.on ?
                        <div className={"w-full max-w-lg"}>
                            <PrimaryButton
                                disabled={false}
                                className={"w-full mt-4 justify-center bg-gray-500"}
                                onClick={() => setEditing({on: false, object: {}})}
                            >
                                Annuler
                            </PrimaryButton>
                        </div>
                        : null}
                </div>
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-wrap grow gap-2">
                    <ProjectsList medias={medias} projects={projects} projectMedias={projectMedias} authors={authors}  setEditing={setEditing} editing={editing}/>
                </div>
            </section>
    );
}
