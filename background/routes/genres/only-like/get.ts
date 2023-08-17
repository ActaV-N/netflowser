import { Language, chromeStorage } from '../../../storage';
import { channelInstance } from '../..';

channelInstance.get('/genres/only-like', async () => {
  const { genres } = await chromeStorage.get('genres', 'local');
  const { likes, language } = await chromeStorage.get(['likes', 'language']);

  const likeSet = new Set(likes);

  return genres
    .filter((genre: Genre) => likeSet.has(genre.code))
    .map((genre: Genre) => ({
      code: genre.code,
      title: genre[language as Language],
      like: true,
    }));
});
