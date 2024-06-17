"use client"; // This directive tells Next.js that this component is a client component

import React, { FC } from 'react';
import { showToast } from "@/utils/toastify/showToast";

interface UploadFormProps {
    user?: any; // Consider specifying a more precise type for `user` if possible
}

const UploadForm: FC<UploadFormProps> = ({ user }) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const formData = new FormData();
            Array.from(e.dataTransfer.files).forEach((file) => {
                formData.append("file", file);
            });

            const response = fetch("/api/upload", {
                method: "POST",
                body: formData,
            }).then(response => response.json());

            response.then(result => {
                if (result.success) {
                    showToast('success', `${result.message}`)
                } else {
                    showToast('error', `${result.message}`)
                }
            });
        }
    };

    return (
        <div className="relative">
            {/* Existing label and input */}
            <label title="Click to upload" htmlFor="button2"
                   className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                <div className="w-max relative">
                    <img className="w-12" src="https://www.svgrepo.com/show/485545/upload-cicle.svg" alt="file upload icon"
                         width="512" height="512"/>
                </div>
                <div className="relative">
          <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
              Upload a file
          </span>
                    <span className="mt-0.5 block text-sm text-gray-500">Max 2 MB</span>
                </div>
            </label>
            <input
                hidden
                className={'opacity-0'}
                id={"button2"}
                type="file"
                name="file"
                onChange={async (e) => {
                    if (e.target.files) {
                        const formData = new FormData();
                        Object.values(e.target.files).forEach((file) => {
                            formData.append("file", file);
                        });

                        const response = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                        });

                        const result = await response.json();
                        if (result.success) {
                            showToast('success', `Fichier téléchargé : ${result.name}`)
                        } else {
                            showToast('error', `Echec du téléchargement`)
                        }
                    }
                }}
            />
        </div>
    );
};

export default UploadForm;
