import OpenAI from "openai";
import type { AiPlan } from "@/lib/schema";
import { aiPlanSchema } from "@/lib/schema";
import type { Metrics, RiskLevel } from "@/lib/scoring";

const SYSTEM_PROMPT = `
Та өсвөр насны хүүхдийг ойлгох талаар зөвлөмж өгдөг туслах.
Ерөнхий эцэг эхийн зөвлөгөө өг, онош/сэтгэл заслын эмчилгээ биш гэдгийг сануул.
Дэмжлэгтэй, бодитой, шүүмжлэлгүй өнгө аястай бич.
Богино сумласан зөвлөмж өг.
Улаан туг (red flags) болон мэргэжлийн тусламж авах үеийг дурд.
Хувийн мэдээлэл (нэр, сургууль, утас, хаяг) битгий асуу.
`.trim();

const responseSchema = {
  name: "teen_understanding_guidance",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      summary: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          paragraph: { type: "string" },
        },
        required: ["title", "paragraph"],
      },
      key_risks: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
      },
      key_strengths: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
      },
      persona_explainer: { type: "string" },
      conversation_starters: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
      },
      do_dont: {
        type: "object",
        additionalProperties: false,
        properties: {
          do: { type: "array", items: { type: "string" } },
          dont: { type: "array", items: { type: "string" } },
        },
        required: ["do", "dont"],
      },
      plan_14_days: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            day: { type: "string" },
            actions: { type: "array", items: { type: "string" } },
          },
          required: ["day", "actions"],
        },
      },
      plan_30_days: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            week: { type: "string" },
            actions: { type: "array", items: { type: "string" } },
          },
          required: ["week", "actions"],
        },
      },
      red_flags: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
      },
      disclaimer: { type: "string" },
    },
    required: [
      "summary",
      "persona_explainer",
      "key_risks",
      "key_strengths",
      "conversation_starters",
      "do_dont",
      "plan_14_days",
      "plan_30_days",
      "red_flags",
      "disclaimer",
    ],
  },
  strict: true,
};

export type PlanInput = {
  persona: string;
  riskLevel: RiskLevel;
  metrics: Metrics;
};

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export function buildFallbackPlan(persona: string): AiPlan {
  const fallback: AiPlan = {
    summary: {
      title: `${persona} — Ерөнхий зөвлөмж`,
      paragraph:
        "Өсвөр насны хүүхэдтэй харилцахад сонсох, тайван ярилцах, тодорхой дүрэмтэй байх нь хамгийн үр дүнтэй алхамууд юм.",
    },
    persona_explainer:
      "Энэ persona нь харилцаа, стресс, хил хязгаар болон дижитал орчны талаарх дохионоос тодорхойлогдсон.",
    key_risks: [
      "Харилцааны сувгууд хаагдах эрсдэл нэмэгдэж болно.",
      "Стрессийн дохио удаан үргэлжилбэл сургалт ба харилцаанд нөлөөлнө.",
      "Дижитал хэрэглээ хяналтгүй байвал зөрчил үүснэ.",
    ],
    key_strengths: [
      "Тодорхой дүрэм ба тогтмол харилцаа боломжтой.",
      "Дэмжлэгтэй уур амьсгал бий болгох нөөц байна.",
      "Эрсдэлийг бууруулах жижиг алхмуудыг хийх боломжтой.",
    ],
    conversation_starters: [
      "Сүүлийн үед юу хамгийн их бодогдож байна вэ?",
      "Сургууль дээр юу хамгийн амархан/хэцүү байна вэ?",
      "Чамд туслахын тулд би юу хийж болох вэ?",
    ],
    do_dont: {
      do: [
        "Сонсох хугацааг уртасгаж, асуултаар дэмж.",
        "Хүүхдийн мэдрэмжийг зөвшөөрч, нэрлэ.",
        "Бага боловч тогтмол ганцаарчилсан цаг гарга.",
      ],
      dont: [
        "Шууд шийтгэлээр эхлэх.",
        "Харьцуулалт эсвэл шүүмжлэлээр яриа эхлүүлэх.",
        "Дижитал хэрэглээг гэнэт таслах.",
      ],
    },
    plan_14_days: [
      { day: "Day 1", actions: ["Өдөрт 10 минут тайван ярилцах цаг гарга."] },
      { day: "Day 3", actions: ["Хүүхдийн сонирхлыг асууж, хамт нэг зүйл хий."] },
      { day: "Day 7", actions: ["Дүрэм, хил хязгаарыг хамтдаа хэлэлц."] },
      { day: "Day 10", actions: ["Сургууль, найз нөхдийн тухай асуух."] },
      { day: "Day 14", actions: ["Ярианы ахиц, мэдрэмжийг хамт дүгнэх."] },
    ],
    plan_30_days: [
      {
        week: "Week 1",
        actions: ["Харилцааны тогтмол цаг болон дүрмээ тогтоох."],
      },
      {
        week: "Week 2",
        actions: ["Сонсоход төвлөрсөн ярианы дасгал хийх."],
      },
      {
        week: "Week 3",
        actions: ["Дижитал хэрэглээний хязгаар, дүрмээ хамт бичих."],
      },
      {
        week: "Week 4",
        actions: ["Ахиц дүгнэх ба шинэ зорилт тодорхойлох."],
      },
    ],
    red_flags: [
      "Өөрийгөө гэмтээх тухай ярих эсвэл гэнэтийн огцом зан авир.",
      "Сургууль, унтах, идэх хэв маяг огцом өөрчлөгдөх.",
      "Нийгмийн харилцаанаас огцом тусгаарлагдах.",
    ],
    disclaimer: "Ерөнхий зөвлөмж бөгөөд онош/эмчилгээ биш.",
  };

  return fallback;
}

export async function generatePlan(input: PlanInput): Promise<AiPlan> {
  const client = getOpenAIClient();
  if (!client) {
    return buildFallbackPlan(input.persona);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  const content = {
    persona: input.persona,
    riskLevel: input.riskLevel,
    metrics: input.metrics,
    instruction:
      "Дээрх өгөгдөл дээр үндэслэн 14/30 хоногийн төлөвлөгөө болон практик зөвлөмж гарга. Тооцоолол хийхгүй.",
  };

  try {
    const response = await client.responses.create(
      {
        model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: SYSTEM_PROMPT }],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: JSON.stringify(content) }],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: responseSchema.name,
            schema: responseSchema.schema,
          },
        },
      },
      { signal: controller.signal },
    );

    const outputText = response.output_text;
    const parsed = JSON.parse(outputText);
    return aiPlanSchema.parse(parsed);
  } finally {
    clearTimeout(timeout);
  }
}
