import NextLogo from "@/components/svgs/NextLogo";
import SupabaseLogo from "@/components/svgs/SupabaseLogo";
import CookingLogo from "@/components/svgs/CookingLogo";
import ApplicationLogo from "@/components/svgs/ApplicationLogo";
import Image from "next/image"

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
        <div className="relative grid grid-cols-2 grid-rows-2">
            <Image
                className={"rounded-lg row-start-1 col-start-1 row-span-2 col-span-2"}
                src="/img/pexels-enginakyurt.jpg"
                width={500}
                height={500}
                alt="Photo d'un plan de travail par Engin Akyurt"
            />
            <ApplicationLogo className={"scale-[0.8] -translate-y-1/2 -translate-x-[60%] " +
                "border-2 border-white row-start-2 col-start-2 col-end-2 rounded-full p-4 bg-[#004AAD]"}/>
            <CookingLogo className={"border-2 border-white translate-y-1/4 row-start-2 col-start-2 col-end-2 rounded-full p-4 bg-[#252B33]"}/>

        </div>
        <h1 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Faîte briller {" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
            Els Togo
        </a>{" "}
        avec Els Cooking, le gastronome du web.
      </h1>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
