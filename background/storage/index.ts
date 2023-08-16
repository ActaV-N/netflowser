import { genres } from './data';

export type Language = Exclude<keyof (typeof genres)[number], 'code'>;

const likes: number[] = [];
const language: Language = 'ko';

export async function initStorage() {
  chrome.storage.local.set({
    genres,
  });

  chrome.storage.sync.set({
    likes,
    language,
  });
}
