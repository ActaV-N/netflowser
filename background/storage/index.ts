import { genres } from './data';

const myLikes: number[] = [];

export async function initStorage() {
  chrome.storage.local.set({
    genres,
    likes: myLikes,
  });
}
