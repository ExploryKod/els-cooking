"use client";

import React, { useRef, useState } from "react";
import {SelectInput} from "@/components/molecules/SelectInput";
import {showToast} from "@/utils/toastify/showToast";

export type Folders = Array<{
    id: number,
    folderId: string,
    folderName: string
}>

const FOLDERS: Folders = [
    {
        id: 1,
        folderId: "uploads",
        folderName: "uploads"
    },
    {
        id: 2,
        folderId: "projects",
        folderName: "projects"
    },
    {
        id: 3,
        folderId: "misc",
        folderName: "misc"
    }
];

export default function DragAndDropForm() {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [folder, setFolder] = React.useState(FOLDERS[0]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files) {
            const fileListArray = Array.from(e.target.files);
            setFiles(fileListArray);
        }
    }


    async function handleSubmitFile() {
        if (files.length === 0) {
            showToast('warning', 'Vous devez sélectionner un fichier')
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });

        if(folder) {
            formData.append("folder", folder.folderName)
        }

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                showToast('success', `${result.message}`)
                setFiles([]);
            } else {
                showToast('error', `${result.message}`)
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            showToast('error', `Une erreur est survenu lors du transfert: ${error}`)
        }
    }

    function handleDrop(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                setFiles((prevState: File[]) => [...prevState, e.dataTransfer.files[i]]);
            }
        }
    }

    function handleDragLeave(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile(index: number) {
        const newArr = [...files];
        newArr.splice(index, 1);
        setFiles(newArr);
    }

    function openFileExplorer() {
        inputRef.current?.click();
    }

    return (
        <div className="relative flex flex-col sm:flex-row gap-2">
            <form
                className={`${dragActive ? "bg-blue-400" : "bg-white"} 
                min-w-[300px] p-4 w-full rounded-lg  min-h-[10rem] text-center 
                basis-1/2 flex flex-col items-center justify-center
                cursor-pointer gap-4 px-6 py-4 group`}
                onDragEnter={handleDragEnter}
                onSubmit={(e) => e.preventDefault()} // Prevent form submission
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >

                <div className="w-max relative text-purple-950 group-hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-upload">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                </div>
                <input
                    placeholder="fileInput"
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    multiple={true}
                    onChange={handleChange}
                    accept=".xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                />

                <p className={"text-gray-500"}>
                    Glisser-déposer ou{" "}
                    <span
                        className="font-bold text-blue-600 cursor-pointer"
                        onClick={openFileExplorer}
                    >
                        Sélectionner
                    </span>{" "}
                    des fichiers
                </p>
                {files.length > 0 ?
                    (<div className={"flex flex-col gap-2"}>
                        <SelectInput
                            value={folder}
                            onChange={setFolder}
                            options={FOLDERS}
                            mapOptionToLabel={(folder: any) => folder.folderName}
                            mapOptionToValue={(folder: any) => folder.id}
                        />
                        <small className={"text-gray-500 italic text-sm"}>Envoyer vos fichiers dans le répertoire de
                            stockage <span className={"font-bold text-emerald-900"}>{folder.folderName}&nbsp;</span>:</small>
                        <button
                            className="bg-black rounded-lg p-2 mt-3 w-auto"
                            onClick={handleSubmitFile}
                        >
                            <span className="p-2 text-white">Télécharger</span>
                        </button>

                    </div>) : null
                }
            </form>
            <div className="basis-1/2 overflow-hidden flex flex-col gap-1 px-6 py-4 bg-white rounded-lg">
                {files.length > 0 ? (<>
                        <div className={"w-full"}>
                            <h2 className={"mb-2 text-emerald-900"}>Prêts au téléchargement: </h2>
                        </div>
                        {files.map((file, index) => (
                            <div key={index.toString() + `${Date.now()}-${Math.round(Math.random() * 1e9)}`} className="flex flex-row space-x-5">
                                <span className="truncate text-gray-800">{file.name}</span>
                                <span
                                className="text-red-500 cursor-pointer"
                                onClick={() => removeFile(index)}
                            >
                               Retirer
                            </span>
                        </div>
                    ))}</>) :
                    (<div className={"w-full flex flex-col"}>
                        <h2 className={"text-gray-900 text-center"}>Aucun fichier sélectionné</h2>
                        <p className={"my-2 text-gray-600 text-center italic"}>Vos fichiers prêt au téléchargement apparaîtrons ici</p>
                    </div>)}
            </div>
        </div>
    );
}
