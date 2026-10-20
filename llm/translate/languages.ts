import { franc } from "../../deps.ts";

export const languageNames: Record<string, string> = {
  es: "LATAM Spanish",
  "es-ES": "European Spanish",
  en: "English",
  "en-US": "American English",
  pt: "Brazilian Portuguese",
  "pt-BR": "Brazilian Portuguese",
  "pt-PT": "European Portuguese",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  "zh-CN": "Simplified Chinese",
  "zh-TW": "Traditional Chinese",
  ru: "Russian",
  ar: "Arabic",
  hi: "Hindi",
  tr: "Turkish",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
};

const languageCodes: Record<string, string> = {
  es: "spa",
  en: "eng",
  pt: "por",
  fr: "fra",
  de: "deu",
  it: "ita",
  ja: "jpn",
  ko: "kor",
  zh: "zho",
  ru: "rus",
  ar: "ara",
  hi: "hin",
  nl: "nld",
  pl: "pol",
  tr: "tur",
  sv: "swe",
  da: "dan",
  no: "nor",
  fi: "fin",
  el: "ell",
  he: "heb",
  th: "tha",
  vi: "vie",
  id: "ind",
  uk: "ukr",
  cs: "ces",
  ro: "ron",
  hu: "hun",
  bn: "ben",
};

export function getFrancCodeFromLanguage(language: string): string {
  return languageCodes[language.toLowerCase()] ?? "eng";
}

export function getLanguageFromFrancCode(language: string): string {
  return Object.entries(languageCodes).find(
    ([, francCode]) => francCode === language.toLowerCase(),
  )?.[0] ?? "en";
}

export const detectLanguage = (text: string): string => {
  if (!text.trim()) return "en";

  const language = franc(text);

  return language === "und"
    ? "en"
    : getLanguageFromFrancCode(language);
};