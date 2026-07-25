export interface DailyRecord {
  date: string;
  energiFisik: number | null;
  energiMental: number | null;
  thought: string | null;
  friction: number | null;
  note: string;
}

export function generateInsight(records: DailyRecord[]) {
  if (!records || records.length === 0) {
    return {
      title: "Mulai perjalanan pertamamu",
      text: "Nalar merekam pola harianmu untuk membantumu mengenali diri lebih dalam. Selesaikan Catatan Malam pertamamu."
    };
  }

  const totalRecords = records.length;
  
  let totalFisik = 0;
  let totalMental = 0;
  const thoughtCounts: { [key: string]: number } = {};

  records.forEach(r => {
    totalFisik += r.energiFisik || 0;
    totalMental += r.energiMental || 0;
    if (r.thought) {
      thoughtCounts[r.thought] = (thoughtCounts[r.thought] || 0) + 1;
    }
  });

  const avgFisik = (totalFisik / totalRecords).toFixed(1);
  const avgMental = (totalMental / totalRecords).toFixed(1);

  // Cari topik pikiran yang paling sering muncul
  let mostCommonThought = "Beragam";
  let maxCount = 0;
  for (const [thought, count] of Object.entries(thoughtCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonThought = thought;
    }
  }

  if (totalRecords === 1) {
    return {
      title: "Langkah awal yang bermakna",
      text: `Catatan pertama telah tersimpan. Fokus utamamu hari ini adalah '${mostCommonThought}'. Nalar akan terus mengumpulkan pola seiring bertambahnya data.`
    };
  }

  return {
    title: `Pola dari ${totalRecords} Catatan`,
    text: `Dalam beberapa hari terakhir, pikiranmu cenderung didominasi oleh '${mostCommonThought}'. Rata-rata energi fisik tercatat di angka ${avgFisik} dan mental ${avgMental}.`
  };
}