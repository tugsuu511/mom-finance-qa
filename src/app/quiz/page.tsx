import Link from "next/link";
import QuizStepper from "@/components/QuizStepper";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/">Нүүр</Link>
          </Button>
          <p className="text-sm text-slate-500">25 асуулт · 5–7 минут</p>
        </div>
        <QuizStepper />
      </main>
    </div>
  );
}
