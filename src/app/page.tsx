import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-14">
        <section className="grid gap-8 rounded-3xl border border-amber-100 bg-white/70 p-8 shadow-sm backdrop-blur">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Teen Understanding Q&A Test
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              Өсвөр насны хүүхдээ ойлгох тест (5–7 минут)
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              25 богино асуултад хариулаад харилцаа, итгэл, хил хязгаар,
              стрессийн нөхцөлийг тодорхойлж, богино хугацааны практик
              зөвлөмж аваарай.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" className="bg-slate-900 text-white" asChild>
              <Link href="/quiz">Тест эхлүүлэх</Link>
            </Button>
            <p className="text-sm text-slate-500">
              Нийт 25 асуулт, үр дүн шууд гарна.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Харилцааны дүр зураг",
              text: "Харилцаа, итгэл, хил хязгаарын оноог харуулна.",
            },
            {
              title: "14/30 хоногийн төлөвлөгөө",
              text: "Өдөр, долоо хоног бүр хийх бодит алхамууд.",
            },
            {
              title: "Ярилцлагын тэмдэглэл CSV",
              text: "Хүүхэдтэй хийсэн яриагаа тэмдэглэх файл татаж авна.",
            },
          ].map((item) => (
            <Card key={item.title} className="border-amber-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-slate-600">
                {item.text}
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="border-rose-200 bg-rose-50/70">
          <CardHeader>
            <CardTitle className="text-base text-rose-700">Санамж</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-rose-700">
            Ерөнхий зөвлөмж бөгөөд онош/эмчилгээ биш. Хувийн мэдээлэл
            (нэр, сургууль, утас, хаяг) шаардахгүй.
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
