import { Routes } from "@/routes";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect(Routes.Auth);
  }

  redirect(Routes.Dashboard);
}
