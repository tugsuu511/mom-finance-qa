import type { QuizAnswers } from "@/lib/schema";

export type Metrics = {
  communicationScore: number;
  trustScore: number;
  boundaryScore: number;
  stressScore: number;
};

export type RiskLevel = "low" | "medium" | "high";

export type ScoringResult = {
  metrics: Metrics;
  riskLevel: RiskLevel;
  persona: string;
};

function clampScore(value: number) {
  if (value < 0) return 0;
  if (value > 10) return 10;
  return value;
}

export function computeScores(answers: QuizAnswers): Metrics {
  let communicationScore = 0;
  let trustScore = 0;
  let boundaryScore = 0;
  let stressScore = 0;

  if (answers.oneOnOne7d === "4+") communicationScore += 3;
  else if (answers.oneOnOne7d === "2-3") communicationScore += 2;
  else if (answers.oneOnOne7d === "1") communicationScore += 1;

  if (answers.talkStyle === "open") communicationScore += 2;
  else if (answers.talkStyle === "general") communicationScore += 1;
  else if (answers.talkStyle === "command") communicationScore -= 1;
  else if (answers.talkStyle === "conflict") communicationScore -= 2;

  if (answers.parentListening === "curious") communicationScore += 2;
  else if (answers.parentListening === "advice") communicationScore += 1;
  else if (answers.parentListening === "scold") communicationScore -= 2;

  if (answers.childShares === "often") communicationScore += 2;
  else if (answers.childShares === "sometimes") communicationScore += 1;
  else if (answers.childShares === "never") communicationScore -= 2;

  if (answers.lieSuspicion === "rare") trustScore += 2;
  else if (answers.lieSuspicion === "often") trustScore -= 2;

  if (answers.introducesFriends === "yes") trustScore += 2;
  else if (answers.introducesFriends === "some") trustScore += 1;
  else if (answers.introducesFriends === "no") trustScore -= 2;

  if (answers.moneyTalk === "balanced") trustScore += 2;
  else if (answers.moneyTalk === "overcontrol") trustScore -= 2;

  if (answers.rulesClarity === "yes") boundaryScore += 2;
  else if (answers.rulesClarity === "medium") boundaryScore += 1;
  else if (answers.rulesClarity === "no") boundaryScore -= 2;

  if (answers.screenRules === "followed") boundaryScore += 2;
  else if (answers.screenRules === "none") boundaryScore -= 2;

  if (answers.chores === "regular") boundaryScore += 2;
  else if (answers.chores === "some") boundaryScore += 1;
  else if (answers.chores === "none") boundaryScore -= 1;

  if (answers.reactionToMistake === "solve_together") boundaryScore += 2;
  else if (answers.reactionToMistake === "explain") boundaryScore += 1;
  else if (answers.reactionToMistake === "punish") boundaryScore -= 2;

  if (answers.anger2w === "high") stressScore += 2;
  else if (answers.anger2w === "medium") stressScore += 1;

  if (answers.sadness2w === "high") stressScore += 2;
  else if (answers.sadness2w === "medium") stressScore += 1;

  if (answers.sleep === "very_bad") stressScore += 2;
  else if (answers.sleep === "somewhat") stressScore += 1;

  if (answers.appetite === "very_changed") stressScore += 2;
  else if (answers.appetite === "somewhat") stressScore += 1;

  if (answers.schoolStress === "high") stressScore += 2;
  else if (answers.schoolStress === "medium") stressScore += 1;

  return {
    communicationScore: clampScore(communicationScore),
    trustScore: clampScore(trustScore),
    boundaryScore: clampScore(boundaryScore),
    stressScore: clampScore(stressScore),
  };
}

export function computeRiskLevel(metrics: Metrics): RiskLevel {
  if (metrics.stressScore >= 7) return "high";
  if (metrics.trustScore <= 2 && metrics.communicationScore <= 2) return "high";
  if (metrics.stressScore >= 4 && metrics.stressScore <= 6) return "medium";
  if (metrics.boundaryScore <= 3) return "medium";
  return "low";
}

export function computePersona(answers: QuizAnswers, metrics: Metrics): string {
  const lowCommunication = metrics.communicationScore <= 2;
  const lowTrust = metrics.trustScore <= 2;

  if (metrics.stressScore >= 7) return "Стресстэй, эмзэг";
  if (lowCommunication && lowTrust) return "Хаалттай, дуугүй";
  if (metrics.boundaryScore <= 3 && answers.curfewConflict === "high")
    return "Хил соригч";
  if (
    answers.screenTime === "6+" &&
    (answers.screenRules === "none" ||
      answers.screenRules === "exists_not_followed")
  )
    return "Дижиталд ууссан";
  if (answers.peerInfluence === "high" || answers.bullyingConcern === "yes")
    return "Найзын нөлөө их";
  return "Тогтвортой өсөлт";
}

export function scoreQuiz(answers: QuizAnswers): ScoringResult {
  const metrics = computeScores(answers);
  const riskLevel = computeRiskLevel(metrics);
  const persona = computePersona(answers, metrics);
  return { metrics, riskLevel, persona };
}
