import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import Tweets from "@/components/Tweets";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

export default async function Page({ email }: any) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const imgSrc = session?.user?.image || "";
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  const username = user?.username;
  prisma.$disconnect();

  return (
    <div className="h-screen">
      <div className="relative h-32 xl:h-48 bg-neutral-800/80 ">
        <Image
          src={imgSrc}
          alt="Profile Icon"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover absolute bottom-0 left-4 transform translate-y-1/2 border-4 border-black"
        />
      </div>
      <div className="p-6 pt-12 border-b border-r border-neutral-800 ">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{session?.user?.name}</p>
          <p className="text-md text-neutral-500">@{username}</p>
        </div>
      </div>
      <Tweets />
    </div>
  );
}
