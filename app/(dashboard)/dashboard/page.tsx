import LogoutButton from "@/components/LogoutButton";
import checkAuthentication from "@/hooks/checkAuthentication";
// import { logout } from "@/hooks/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const { user } = await checkAuthentication(cookies().get("token")?.value);
  const logout = async () => {
    "use server";
    cookies().delete("token");
    redirect("/login");
  };
  const { name, phone, email } = user;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-slate-500 p-3 rounded flex flex-col gap-2 justify-center  items-center">
        <p>{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
        <form action={logout}>
          <LogoutButton />
        </form>
      </div>
      <Link href="/map">map</Link>
    </div>
  );
};

export default Dashboard;
