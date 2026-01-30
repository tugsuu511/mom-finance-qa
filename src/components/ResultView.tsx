"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { AiPlan } from "@/lib/schema";

export type ResultPayload = {
  persona: string;
  riskLevel: "low" | "medium" | "high";
  metrics: {
    communicationScore: number;
    trustScore: number;
    boundaryScore: number;
    stressScore: number;
  };
  aiPlan: AiPlan;
  warnings?: string[];
};

const riskLabelMap = {
  low: "Бага",
  medium: "Дунд",
  high: "Өндөр",
};

const riskValueMap = {
  low: 30,
  medium: 60,
  high: 90,
};

export default function ResultView({ result }: { result: ResultPayload }) {
  return (
    <div className="space-y-6">
      {result.warnings?.length ? (
        <Card className="border-amber-200 bg-amber-50/70">
          <CardHeader>
            <CardTitle className="text-base text-amber-700">
              Анхааруулга
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-700">
            <ul className="list-disc space-y-1 pl-5">
              {result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-slate-200 bg-white/90">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl text-slate-900">
              {result.aiPlan.summary.title}
            </CardTitle>
            <Badge className="w-fit bg-slate-900 text-white">
              {result.persona}
            </Badge>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Эрсдэлийн түвшин: {riskLabelMap[result.riskLevel]}</p>
            <Progress value={riskValueMap[result.riskLevel]} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600">
          <p>{result.aiPlan.summary.paragraph}</p>
          <p className="text-sm text-slate-500">
            {result.aiPlan.persona_explainer}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Харилцаа
              </p>
              <p className="text-base font-semibold text-slate-900">
                {result.metrics.communicationScore}/10
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Итгэл
              </p>
              <p className="text-base font-semibold text-slate-900">
                {result.metrics.trustScore}/10
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Хил хязгаар
              </p>
              <p className="text-base font-semibold text-slate-900">
                {result.metrics.boundaryScore}/10
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Стресс
              </p>
              <p className="text-base font-semibold text-slate-900">
                {result.metrics.stressScore}/10
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-rose-100 bg-rose-50/60">
          <CardHeader>
            <CardTitle className="text-base text-rose-700">
              Гол эрсдэлүүд
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-rose-700">
            <ul className="list-disc space-y-2 pl-5">
              {result.aiPlan.key_risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-emerald-50/60">
          <CardHeader>
            <CardTitle className="text-base text-emerald-700">
              Давуу талууд
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-emerald-700">
            <ul className="list-disc space-y-2 pl-5">
              {result.aiPlan.key_strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white/90">
        <CardHeader>
          <CardTitle className="text-base text-slate-800">
            Ярилцлага эхлүүлэх санаанууд
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          <ul className="list-disc space-y-2 pl-5">
            {result.aiPlan.conversation_starters.map((starter) => (
              <li key={starter}>{starter}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200 bg-white/90">
          <CardHeader>
            <CardTitle className="text-base text-slate-800">Хийх</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            <ul className="list-disc space-y-2 pl-5">
              {result.aiPlan.do_dont.do.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white/90">
          <CardHeader>
            <CardTitle className="text-base text-slate-800">Болих</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            <ul className="list-disc space-y-2 pl-5">
              {result.aiPlan.do_dont.dont.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white/90">
        <CardHeader>
          <CardTitle className="text-base text-slate-800">
            14 хоногийн төлөвлөгөө
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600">
          {result.aiPlan.plan_14_days.map((day) => (
            <div key={day.day} className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">{day.day}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {day.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white/90">
        <CardHeader>
          <CardTitle className="text-base text-slate-800">
            30 хоногийн төлөвлөгөө
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600">
          {result.aiPlan.plan_30_days.map((week) => (
            <div key={week.week} className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                {week.week}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {week.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-rose-100 bg-rose-50/60">
        <CardHeader>
          <CardTitle className="text-base text-rose-700">Улаан тугууд</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-rose-700">
          <ul className="list-disc space-y-2 pl-5">
            {result.aiPlan.red_flags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-rose-200 bg-rose-50/70">
        <CardHeader>
          <CardTitle className="text-base text-rose-700">Санамж</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-rose-700">
          {result.aiPlan.disclaimer}
        </CardContent>
      </Card>
    </div>
  );
}
