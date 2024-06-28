'use client'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import ProjectListItem from "@/components/projects/ProjectListItem";
import {showToast} from "@/utils/toastify/showToast";

export default function GetProjects({user}: any) {
    const [projects, setProjects] = useState<any[] | null>(null)
    const [projectMedias, setProjectMedias] = useState<any[] | null>(null)
    const [medias, setMedias] = useState<any[] | null>(null)
    const [authors, setAuthors] = useState<any[] | null>(null)
    const [users, setUsers] = useState<any[] | null>(null)
    const [deleteProjectId, setDeleteProjectId] = useState<number>(0);
    const [editing, setEditing] = useState({on:false, object:{}});
    const supabase = createClient()

    useEffect(() => {

        const getProjects = async () => {
            const { data } = await supabase.from('projects').select()
            setProjects(data)
        }
        getProjects()
        const getMedias= async () => {
            const { data } = await supabase.from('medias').select('id, media_slug, media_extension, media_description')
            setMedias(data)
        }
        getMedias()

        const getProjectMedias= async () => {
            const { data } = await supabase.from('project_media').select()
            setMedias(data)
        }
        getProjectMedias()

        const getUsersFromAuth = async () => {
            const { data } = await supabase.from('auth')
                .select()
            setUsers(data)
        }
        getUsersFromAuth()

        const getProjectAuthors = async () => {
            const { data } = await supabase.from('projects')
                .select(`*, user_id:${user.id}`)
            setAuthors(data)
        }
        getProjectAuthors()

    }, [])

    const getProjectDeleted = async (projectId: any) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', projectId)

        if (error) {
            showToast('error', `Une erreur est survenue, le projet n° ${projectId.toString()} n'est pas supprimé`)
            console.error('Error deleting project:', error)
        } else {
            showToast('success', `projet n° ${projectId.toString()} bien supprimé`)
            projects && setProjects(projects.filter((project) => project.id !== projectId))
        }
    }

    const handleProjectDeletion = (projectId : number) => {
        setDeleteProjectId(projectId)
        getProjectDeleted(projectId)  // Call the delete function with the project ID
    }




    return (
        <div className={`bg-gray-100 rounded p-5`}>
            <h2> {projects && projects.length > 0 ? 'Liste des projets :' : 'Aucun projet en cours'}</h2>
            {projects && projects.length > 0 ?
                <>
                    <ul className={`mt-5 flex flex-col gap-4`}>
                        {projects.map(project =>
                            <ProjectListItem projectMedias={projectMedias}
                                             key={project.id}
                                             project={project}
                                             medias={medias}
                                             authors={authors}
                                             setEditing={setEditing}
                                             handleProjectDeletion={handleProjectDeletion}
                                             editing={editing}
                                             user={user}
                            />
                        )}
                    </ul>
                </> : null}
        </div>
    )
}