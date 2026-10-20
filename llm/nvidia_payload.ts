import { Language } from "../Neon/index.ts";
import { translationConfig } from "./translate/translation-config.ts";
import { TranslateCVContentRequest } from "./translate/types.ts";

export enum FeatureLLM {
  translate
}

export const generateNVIDIAPayload = (feature: FeatureLLM, requestContent: TranslateCVContentRequest, sourceLanguage: Language) => {

  if (feature == FeatureLLM.translate) {
    return translationConfig(requestContent, sourceLanguage);
  }
}

