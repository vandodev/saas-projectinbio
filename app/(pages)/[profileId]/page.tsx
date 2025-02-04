import ProjectCard from "@/app/components/commons/project-card";
import TotalVisits from "@/app/components/commons/total-visits";
import UserCard from "@/app/components/commons/user-card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfileData } from "@/app/server/get-profile-data";
import { auth } from "@/app/lib/auth";

export default async function ProfilePage({
  params,
}: {
    params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();
  // console.log(profileData) 

  const session = await auth();
  const isOwner = profileData.userId === session?.user?.id;

  // TODO: Adicionar page view
  // Se o usuario não estiver mais no trial, nao deixar ver o projeto. Redirecionar para upgrade


  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        
          {isOwner && (
            <button className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border hover:border-dashed border-border-secondary">
              <Plus className="size-10 text-accent-green" />
              <span>Novo projeto</span>
            </button>
          )}
      </div>
      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
// http://localhost:3000/123