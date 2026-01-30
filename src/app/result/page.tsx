"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ResultView, { type ResultPayload } from "@/components/ResultView";
import ConversationTrackerCsvButton from "@/components/ConversationTrackerCsvButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RESULT_KEY = "teen-qa-result-v1";

export default function ResultPage() {
  const [result, setResult] = useState<ResultPayload | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(RESULT_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as ResultPayload;
      setResult(parsed);
    } catch {
      sessionStorage.removeItem(RESULT_KEY);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Тестийн үр дүн
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Өсвөр насны хүүхдээ ойлгох зөвлөмж
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Нүүр</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/quiz">Дахин бөглөх</Link>
            </Button>
          </div>
        </div>

        {!result ? (
          <Card className="border-amber-200 bg-amber-50/70">
            <CardHeader>
              <CardTitle className="text-base text-amber-700">
                Үр дүн олдсонгүй
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-amber-700">
              Тестээ бөглөж дуусмагц үр дүн энд гарна.
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ConversationTrackerCsvButton />
              <p className="text-xs text-slate-500">
                Ерөнхий зөвлөмж бөгөөд онош/эмчилгээ биш.
              </p>
            </div>
            <ResultView result={result} />
          </>
        )}
      </main>
    </div>
  );
}
