import React from "react";
import ProjectListItem from "@/components/projects/ProjectListItem";


export default function ProjectsList({projects, authors, setEditing, editing, projectMedias, medias}: any) {

    return (
        <div className={`bg-gray-100 rounded p-5`}>
            <h2> {projects && projects.length > 0 ? 'Liste des projets :' : 'Aucun projet en cours' }</h2>
            {projects && projects.length > 0 ?
                <>
                    <ul className={`mt-5 flex flex-col gap-4`}>
                        {projects.map((project: any) =>
                            <ProjectListItem projectMedias={projectMedias}
                                             key={project.id}
                                             project={project}
                                             medias={medias}
                                             authors={authors}
                                             setEditing={setEditing}
                                             editing={editing}/>
                        )}
                    </ul>
                </> :null}
        </div>
    )
}
