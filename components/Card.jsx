import React from 'react'
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('fr-FR');
dayjs.extend(relativeTime);

export default function Card({ addedcss="", image, actions, user_id, children, created_at=null}) {

    const { auth } = usePage().props

    return (
        <div className={`${addedcss} bg-gray-100 border rounded-md border-gray-600 p-6 flex space-x-2`}>
            {image ? (<div className="flex justify-between gap-2">
                {image}
            </div>) : null}
            <div className="flex-1 h-full flex justify-between items-center gap-5">
                <div className="h-full w-full flex flex-col gap-2">
                    <div className={`flex justify-between gap-2`}>
                        {created_at !== null ?
                            <small className="ml-2 text-sm text-gray-600"> Créé {dayjs(created_at).fromNow()}</small>
                        : null}
                        <div className="">
                            {auth.user.id === user_id && actions.length > 0 ?
                                (<Dropdown>
                                    <Dropdown.Trigger>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className="h-4 w-4 text-gray-400"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                    {actions.filter(action =>
                                        action.id &&
                                        action.itemId &&
                                        action.actionPath &&
                                        action.pathName &&
                                        action.method &&
                                        (action.ui === "button" || "") &&
                                        action.actionText)
                                        .map(action => {
                                        return (
                                            <>
                                                    <Dropdown.Link
                                                        key={action.id}
                                                        type={action.ui}
                                                        as={action.ui}
                                                        method={action.method}
                                                        href={action.pathName === 'enable' ?
                                                            route(`${action?.actionPath}`, action.itemId) :
                                                            `${action.actionPath}`}
                                                    >
                                                        {action.actionText}
                                                    </Dropdown.Link>
                                            </>
                                        )
                                    })}
                                    </Dropdown.Content>
                                </Dropdown>) : null
                            }
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>

    )

}
