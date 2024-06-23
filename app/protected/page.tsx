import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import GetProjects from "@/components/projects/GetProjects";
import UploadForm from "@/components/utilities/UploadForm";
import DragAndDropForm from "@/components/utilities/DragAndDropForm";
import {Demo} from "@/components/tests/Demo";
import Image from "next/image";

export function ProjectImage({ src, alt }: any) {
  return <Image src={`/misc/${src}.svg`} alt={alt} width="64" height="64" />
}

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="my-5 flex-1 flex flex-col gap-6">
          <GetProjects user={user} />
          <DragAndDropForm />
          {/*<Demo />*/}
          <ProjectImage src={"els-cooking-logo_1_1719153048833-746526756"} alt={"els image"} />

        </main>
      </div>
    </div>
  );
}
