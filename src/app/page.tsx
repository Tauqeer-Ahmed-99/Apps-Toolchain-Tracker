import { redirect } from "next/navigation";
import { Routes } from "@/routes";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect(Routes.Auth);
  }

  redirect(Routes.Dashboard);
}
