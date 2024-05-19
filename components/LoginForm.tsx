import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginForm = () => {
  async function createInvoice(formData: FormData) {
    "use server";
    // const cookieStore = cookies()
    // const theme = cookieStore.get('token')
    // console.log(theme)
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
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
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={createInvoice}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
