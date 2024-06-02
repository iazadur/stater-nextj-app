import * as React from "react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {


  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)

  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }

  async function onSubmit(formData: FormData) {
    "use server";
    const cookieStore = cookies()
    const theme = cookieStore.get('token')
    console.log(theme)
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(formData)
    const res = await fetch("https://tracev2.barikoimaps.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(rawFormData),
    });
    const data = await res.json();
    await cookies().set("token", data?.token);
    if (data?.token) {
      //  redirect to dashboard
      redirect("/dashboard");
    }
    // console.log(rawFormData)

    // mutate data
    // revalidate cache
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={onSubmit}>
        <div className="grid gap-2 gap-y-4">
         
          <div className="grid gap-1 gap-y-2">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              placeholder="iamazadur@gmail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              // disabled={isLoading}
            />
          </div>
          <div className="grid gap-1 gap-y-2">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              name="password"
              id="password"
              placeholder="!@#$%^&*"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              // disabled={isLoading}
            />
          </div>
          <Button>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" >
        {/* {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : ( */}
          <Icons.gitHub className="mr-2 h-4 w-4" />
        {/* )}{" "} */}
        GitHub
      </Button>
    </div>
  )
}