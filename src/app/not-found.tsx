import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface px-5 py-24 text-center">
      <Logo />
      <p className="mt-10 text-7xl font-extrabold text-sky">404</p>
      <h1 className="mt-3 text-3xl font-extrabold">Page not found</h1>
      <p className="lead mt-3 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/contact" className="btn btn-secondary">
          Contact us
        </Link>
      </div>
    </main>
  );
}
