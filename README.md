# Teen Understanding Q&A Test

MVP web app that collects 25 answers about understanding an adolescent child, computes deterministic scores/persona, and generates Mongolian guidance via the OpenAI Responses API.

## Setup

```bash
npm install
```

## Environment

Create `.env`:

```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5-mini
```

If `OPENAI_API_KEY` is missing, the app returns a fallback guidance object and shows a warning.

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Architecture

- `src/app/page.tsx` home page with CTA + disclaimer.
- `src/app/quiz/page.tsx` multi-step quiz with client-side validation and localStorage persistence.
- `src/app/api/result/route.ts` validates input, computes deterministic scoring, and calls OpenAI Responses API.
- `src/app/result/page.tsx` reads result from sessionStorage and renders guidance + CSV download.
- `src/lib/scoring.ts` deterministic metrics, risk level, and persona selection.
- `src/lib/openai.ts` OpenAI client + JSON-schema enforced guidance generation + fallback.
- `src/lib/schema.ts` Zod schemas for request/response.

## Notes

- No PII is requested or stored. Answers are stored only in `localStorage`.
- Server never touches client storage; results are returned statelessly.
- Disclaimer: “Ерөнхий зөвлөмж бөгөөд онош/эмчилгээ биш.”
