import PrimaryButton from "@/Components/PrimaryButton.jsx";

const CardContent = ({submit=null, editing=null, setEditing=null, setData=null, reset=null, clearErrors=null, children }) => {

    return(
        <>
        {(editing && submit && reset && clearErrors) ? <form onSubmit={submit}>
                    <input type="text" placeholder={`${editing}`}
                           onChange={e => setData(`${editing}`, e.target.value)}
                           className={`mt-4 w-full text-gray-900 border-gray-300
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm`}/>

                    <div className="flex flex-col">
                        <PrimaryButton className="flex-grow mt-4 flex flex-col items-center bg-red-500">Valider</PrimaryButton>
                        <PrimaryButton className="flex-grow mt-4 flex flex-col items-center bg-green-800"
                                       onClick={() => { setEditing(false);reset();clearErrors();}}>
                            Annuler
                        </PrimaryButton>
                    </div>
                </form>
                :
            (<div className="h-full w-full flex flex-col justify-between">
                    <div className="mt-5 w-full flex flex-col gap-2">
                        <div>
                            {children}
                        </div>
                    </div>
            </div>)
        }
        </>
    )
}

export default CardContent;
