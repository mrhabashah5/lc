import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card">
          <h1 className="text-2xl font-extrabold">Admin sign in</h1>
          <p className="mt-1 mb-6 text-sm text-muted">Authorised staff only.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
