import FuseServerActionSearch from "@/components/FuseServerActionSearch";
import Link from "next/link";

export default function FuseServerActionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <nav className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Home
        </Link>
      </nav>
      <FuseServerActionSearch />
    </main>
  );
}
