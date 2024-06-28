import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import GetProjects from "@/components/projects/GetProjects";
import DragAndDropForm from "@/components/utilities/DragAndDropForm";
import {ProjectImage} from "@/components/projects/ProjectsImage";
import {MessageCreateForm} from "@/components/section/messageCreateForm";
import {MessageList} from "@/components/section/messagesList";

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
          <MessageCreateForm/>
          <MessageList />
          <GetProjects user={user}/>
          <DragAndDropForm/>
          <ProjectImage src={"els-cooking-logo_1_1719153048833-746526756"} alt={"els image"}/>
        </main>
      </div>
    </div>
  );
}
