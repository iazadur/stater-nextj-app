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
  console.log(data?.users);
  return (
    <div className="container py-10">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((item:any)=><TableRow key={item._id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell className="text-right">{item.user_type}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
  );
}
