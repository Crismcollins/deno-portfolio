import { Language } from "../../Neon/index.ts";
import { CV_CONTENT_JSON_SCHEMA } from "./schemas.ts";
import { languageNames } from "./languages.ts";
import { SYSTEM_PROMPT_CONTENT } from "./prompts.ts";
import { CVContentContract, MessageLLM, RolesLLM, TranslateCVContentRequest } from "./types.ts";

const TRANSLATE_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";


export const translationConfig = (requestContent: TranslateCVContentRequest, sourceLanguage: Language) => {

  const { content, languageTarget } = requestContent;

  return {
    model: TRANSLATE_MODEL,
    messages: [
      generateMessage(
        "system",
        getSystemPrompt(sourceLanguage, languageTarget).content
      ),
      getUserPrompts(content),
    ],
    temperature: 0,
    stream: false,
    max_tokens: 4096,
    guided_json: CV_CONTENT_JSON_SCHEMA,
    chat_template_kwargs: { enable_thinking: false },
  }
}

const generateMessage = (role: RolesLLM, text: string): MessageLLM => {
  return { role, content: text }
}

const getSystemPrompt = (languageSource: Language, languageTarget: string): MessageLLM => {
  const source = languageNames[languageSource] ?? languageSource;
  const target = languageNames[languageTarget] ?? languageTarget;

  const values = [source, target];

  const content = SYSTEM_PROMPT_CONTENT.replace(
    /\{(\d+)\}/g,
    (_, index: string) => values[Number(index)] ?? "",
  );

  return generateMessage('system', content);
}

const getUserPrompts = (content: CVContentContract): MessageLLM => {
  return generateMessage('user', JSON.stringify(content));
}
