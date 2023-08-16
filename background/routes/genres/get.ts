import { channelInstance } from '..';

channelInstance.get('/genres', async () => {
  const { genres } = await chrome.storage.local.get('genres');

  return genres;
});
