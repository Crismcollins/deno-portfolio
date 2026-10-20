import { Language } from "../Neon/index.ts";
import { FeatureLLM, generateNVIDIAPayload } from "./nvidia_payload.ts";
import { TranslateCVContentRequest } from "./translate/types.ts";

const BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';


export const translateContent = async (feature: FeatureLLM, requestContent: TranslateCVContentRequest, sourceLanguage: Language) => {
  const API_KEY = Deno.env.get('NVIDIA_API_KEY');

  const payload = generateNVIDIAPayload(feature, requestContent, sourceLanguage);


  return await fetch(BASE_URL,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
}