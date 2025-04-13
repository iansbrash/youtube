import FuseOptionsExplorer from "@/components/FuseOptionsExplorer";
import Link from "next/link";

export default function FuseOptionsPage() {
  return (
    <main className="min-h-screen flex-col items-center p-4 md:p-8">
      <nav className="mb-8 w-full max-w-6xl mx-auto">
        {" "}
        {/* Added centering and max-width */}
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Home
        </Link>
      </nav>
      <FuseOptionsExplorer />
    </main>
  );
}
