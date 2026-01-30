import { z } from "zod";

export const quizAnswerSchema = z.object({
  oneOnOne7d: z.enum(["none", "1", "2-3", "4+"]),
  talkStyle: z.enum(["conflict", "command", "general", "open"]),
  childShares: z.enum(["never", "sometimes", "often"]),
  parentListening: z.enum(["scold", "advice", "curious"]),
  lieSuspicion: z.enum(["often", "sometimes", "rare"]),
  rulesClarity: z.enum(["no", "medium", "yes"]),
  anger2w: z.enum(["high", "medium", "low"]),
  sadness2w: z.enum(["high", "medium", "low"]),
  sleep: z.enum(["very_bad", "somewhat", "ok"]),
  appetite: z.enum(["very_changed", "somewhat", "normal"]),
  schoolStress: z.enum(["high", "medium", "low"]),
  praiseFreq: z.enum(["never", "sometimes", "often"]),
  introducesFriends: z.enum(["no", "some", "yes"]),
  peerInfluence: z.enum(["high", "medium", "low"]),
  alonePreference: z.enum(["high", "medium", "low"]),
  curfewConflict: z.enum(["high", "medium", "low"]),
  bullyingConcern: z.enum(["yes", "unsure", "no"]),
  screenTime: z.enum(["6+", "3-6", "<3"]),
  screenRules: z.enum(["none", "exists_not_followed", "followed"]),
  secretAccounts: z.enum(["yes", "maybe", "no"]),
  moodAfterSocial: z.enum(["high", "medium", "low"]),
  chores: z.enum(["none", "some", "regular"]),
  reactionToMistake: z.enum(["punish", "explain", "solve_together"]),
  moneyTalk: z.enum(["overcontrol", "balanced", "avoid"]),
  autonomy: z.enum(["low", "medium", "good"]),
});

export const apiRequestSchema = z.object({
  answers: quizAnswerSchema,
});

export const aiPlanSchema = z.object({
  summary: z.object({
    title: z.string(),
    paragraph: z.string(),
  }),
  persona_explainer: z.string(),
  key_risks: z.array(z.string()).min(1),
  key_strengths: z.array(z.string()).min(1),
  conversation_starters: z.array(z.string()).min(1),
  do_dont: z.object({
    do: z.array(z.string()).min(1),
    dont: z.array(z.string()).min(1),
  }),
  plan_14_days: z.array(
    z.object({
      day: z.string(),
      actions: z.array(z.string()).min(1),
    }),
  ),
  plan_30_days: z.array(
    z.object({
      week: z.string(),
      actions: z.array(z.string()).min(1),
    }),
  ),
  red_flags: z.array(z.string()).min(1),
  disclaimer: z.string(),
});

export type QuizAnswers = z.infer<typeof quizAnswerSchema>;
export type AiPlan = z.infer<typeof aiPlanSchema>;

export const apiResponseSchema = z.object({
  metrics: z.object({
    communicationScore: z.number(),
    trustScore: z.number(),
    boundaryScore: z.number(),
    stressScore: z.number(),
  }),
  persona: z.string(),
  riskLevel: z.enum(["low", "medium", "high"]),
  aiPlan: aiPlanSchema,
  warnings: z.array(z.string()).optional(),
});
