import { NextResponse } from "next/server";
import { apiRequestSchema } from "@/lib/schema";
import { scoreQuiz } from "@/lib/scoring";
import { generatePlan, buildFallbackPlan } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = apiRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Буруу өгөгдөл илгээгдсэн байна." },
        { status: 400 },
      );
    }

    const { answers } = parsed.data;
    const { metrics, riskLevel, persona } = scoreQuiz(answers);
    const warnings: string[] = [];

    let aiPlan = buildFallbackPlan(persona);
    try {
      aiPlan = await generatePlan({
        persona,
        riskLevel,
        metrics,
      });
      if (!process.env.OPENAI_API_KEY) {
        warnings.push(
          "OPENAI_API_KEY тохируулаагүй тул ерөнхий зөвлөмж ашиглав.",
        );
      }
    } catch (error) {
      console.error("OpenAI error:", error);
      warnings.push(
        "AI зөвлөмж үүсгэхэд алдаа гарлаа. Ерөнхий зөвлөмж ашиглав.",
      );
    }

    return NextResponse.json({
      metrics,
      persona,
      riskLevel,
      aiPlan,
      warnings: warnings.length ? warnings : undefined,
    });
  } catch {
    return NextResponse.json(
      { error: "Серверийн алдаа. Дараа дахин оролдоно уу." },
      { status: 500 },
    );
  }
}
