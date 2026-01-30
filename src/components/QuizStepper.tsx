"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizSteps, defaultAnswers, QuizQuestion } from "@/lib/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const STORAGE_KEY = "teen-qa-answers-v1";
const RESULT_KEY = "teen-qa-result-v1";

type AnswerState = typeof defaultAnswers;

function isQuestionValid(question: QuizQuestion, answers: AnswerState) {
  const value = answers[question.key];
  return typeof value === "string" && value.length > 0;
}

export default function QuizStepper() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>(defaultAnswers);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<AnswerState>;
      setAnswers({ ...defaultAnswers, ...parsed });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const totalSteps = quizSteps.length;
  const stepQuestions = quizSteps[currentStep];
  const progress = useMemo(() => {
    if (totalSteps === 0) return 0;
    return Math.round(((currentStep + 1) / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  const isStepValid = stepQuestions.every((question) =>
    isQuestionValid(question, answers),
  );

  const updateAnswer = (
    key: keyof AnswerState,
    value: AnswerState[keyof AnswerState],
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async (overrideAnswers?: AnswerState) => {
    setError(null);
    if (currentStep < totalSteps - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const finalAnswers = overrideAnswers ?? answers;
      const payload = { answers: finalAnswers };
      const response = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Алдаа гарлаа. Дахин оролдоно уу.");
      }

      const result = await response.json();
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
      router.push("/result");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Алдаа гарлаа. Дахин оролдоно уу.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  };

  return (
    <Card className="border-slate-200 bg-white/90 shadow-sm">
      <CardHeader className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            Алхам {currentStep + 1} / {totalSteps}
          </p>
          <CardTitle className="text-xl text-slate-900">
            Өсвөр насны хүүхдээ ойлгох тест
          </CardTitle>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent className="space-y-6">
        {stepQuestions.map((question) => (
          <div key={question.key} className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">
              {question.label}
            </Label>
            <RadioGroup
              value={answers[question.key] as string}
              onValueChange={(value) => {
                if (isSubmitting) return;
                const nextAnswers = { ...answers, [question.key]: value };
                updateAnswer(question.key, value);
                if (stepQuestions.length === 1) {
                  setTimeout(() => {
                    void handleNext(nextAnswers);
                  }, 120);
                }
              }}
              className="space-y-2"
            >
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${question.key}-${option.value}`}
                  />
                  <Label
                    htmlFor={`${question.key}-${option.value}`}
                    className="text-sm text-slate-600"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Алдаа</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
          >
            Буцах
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid || isSubmitting}>
            {currentStep === totalSteps - 1 ? "Дуусгах" : "Үргэлжлүүлэх"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
