import React, {useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import PrimaryButton from "@/components/PrimaryButton";
dayjs.extend(relativeTime);
export default function ProjectListItem({ project, user, authors, setEditing, editing, handleProjectDeletion, projectMedias, medias}: any){

    const storage = "storage/uploads/"

    if (!project) {
        return <li className={"text-center text-orange-700"}>Il n'y a pas encore de projets à montrer</li> // or a loading indicator
    }

    const { created_at, project_publish_status } = project
    const createdFrom = dayjs(created_at).fromNow();
    // const projectCreator = user?.name.charAt(0).toUpperCase() + user?.name.slice(1);

    return (
        <li className="flex flex-col gap-1">
            <div className="grow min-w-[350px] flex justify-between gap-2">
                <span className="grow text-gray-600">Projet n°&nbsp;{project.id}&nbsp;:&nbsp;{project.project_title}</span>&nbsp;
                {user.id === project.user_uid ?
                    (<>
                                <span className={`cursor-pointer ${editing ? 'text-orange-700': 'text-blue-950'}`} onClick={() => setEditing({on: true, object: project })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round" className="lucide lucide-pencil"><path
                                        d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path
                                        d="m15 5 4 4"/></svg>
                                </span>
                        <span className={`text-teal-900 hover:text-red-600`}>
                            <PrimaryButton disabled={false} onClick={() => handleProjectDeletion(project.id)}>Supprimer</PrimaryButton>
                            </span>

                        <span className={"text-blue-500 hover:text-green-600"}>
                            {project_publish_status !== 'published' ?
                                (<a href="#">Publier </a>) :
                                (<a href="#">Dépublier </a>)
                            }
                        </span></>) : null}
            </div>
            <span
                className="text-xs text-gray-500">Créé {createdFrom} ({project_publish_status === 'published' ? 'Publié' : 'Brouillon'}). </span>
            {projectMedias?.length > 0 ?
                (<div className={"flex flex-row flex-wrap gap-3"}>
                    {projectMedias.filter((projectMedia : any) => projectMedia.projects_id === project.id).map(
                        (projectMedia: any) => {
                            return <div key={projectMedia.id}>{
                                medias.filter((media: any) => media.id === projectMedia.medias_id).map((media : any) => {
                                    return (<>
                                        <div className={"max-w-[50px]"}>
                                            <img className="w-full object-contain aspect-square"
                                                 src={storage+media.media_provider_id+'.'+media.media_provider_ext} alt={''} />
                                        </div>
                                    </>)
                                })
                            }</div>
                        }
                    )}
                </div>) : <div>Aucun média associé</div>}
        </li>
    )
}
