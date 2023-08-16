import { Language } from '../../storage';
import { channelInstance } from '..';

channelInstance.get('/genres', async () => {
  const { genres } = await chrome.storage.local.get(['genres']);
  const { likes, language } = await chrome.storage.sync.get(['likes', 'language']);

  const likeSet = new Set(likes);

  return genres.map((genre: Genre) => ({
    code: genre.code,
    title: genre[language as Language],
    like: likeSet.has(genre.code),
  }));
});
