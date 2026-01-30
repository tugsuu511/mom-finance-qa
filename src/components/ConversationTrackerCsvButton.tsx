"use client";

import { Button } from "@/components/ui/button";

const headers = ["Date", "Topic", "What I said", "What they said", "Next step"];

const baseRows = [
  ["", "Сургууль", "", "", ""],
  ["", "Найзууд", "", "", ""],
  ["", "Дижитал хэрэглээ", "", "", ""],
  ["", "Гэрийн дүрэм", "", "", ""],
  ["", "Сэтгэл санаа", "", "", ""],
];

export default function ConversationTrackerCsvButton() {
  const handleDownload = () => {
    const csv = [headers, ...baseRows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "conversation-tracker.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload} variant="secondary">Ярилцлагын тэмдэглэл CSV татах</Button>;
}
