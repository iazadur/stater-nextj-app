import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import UsersTable from "./_components/UsersTable";

export default async function UserPage() {
  const res = await fetch("https://tracev2.barikoimaps.dev/users/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  const data = await res.json();
  return (
    <UsersTable data={data?.users} />
  );
}
