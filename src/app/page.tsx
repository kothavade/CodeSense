import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      CodeSense.
      <ModeToggle />
      <Link href="/repo" className={buttonVariants({ variant: "outline" })}>
        Have a github repo?
      </Link>
      <Link href="/source" className={buttonVariants({ variant: "outline" })}>
        Have a code snippet?
      </Link>
    </main>
  );
}
