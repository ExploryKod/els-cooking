import AuthButton from "@/components/AuthButton";


export default async function CreditPage() {

    return (
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-center items-center p-3">
                    <h1 className={"text-xl font-bold text-center"}>CREDITS</h1>
                </div>
            </nav>
            <main className="my-5 flex-1 flex flex-col gap-6">
                <a href={"https://www.pexels.com/photo/assorted-spices-on-brown-wooden-table-beside-red-and-white-textile-1435895/"}>Image
                    du "plan de travail" : Photo by Engin Akyurt</a>
            </main>
        </div>
    )
}