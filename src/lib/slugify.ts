// src/lib/slugify.ts
const from =
  "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøœùúûüýþÿ"
const to =
  "AAAAAAAECEEEEIIIIDNOOOOOOOEUUUUYTHssaaaaaaaeceeeeiiiidnoooooooeuuuuypy"

// Быстрый мап диакритик → ASCII
const map: Record<string, string> = {}
for (let i = 0; i < from.length; i++) map[from[i]] = to[i]

function normalize(str: string): string {
  return str
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
}

export default function slugify(input: string, opts?: { lower?: boolean }) {
  const lower = opts?.lower ?? true
  const base = normalize(input)
    .normalize("NFKD") // разложить комбинированные символы
    .replace(/\p{Diacritic}/gu, "") // убрать диакритику
    .replace(/['"`]/g, "") // кавычки
    .replace(/[^a-zA-Z0-9]+/g, "-") // всё не-алфанум → "-"
    .replace(/^-+|-+$/g, "") // обрезать края
    .replace(/-{2,}/g, "-") // схлопнуть "--" → "-"
  return lower ? base.toLowerCase() : base
}
