import { channelInstance } from '..';

channelInstance.get('/genres', async () => {
  const { genres, likes } = await chrome.storage.local.get(['genres', 'likes']);

  const likeSet = new Set(likes);

  return genres.map((genre: Genre) => ({
    ...genre,
    like: likeSet.has(genre.code),
  }));
});
