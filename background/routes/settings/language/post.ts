import { channelInstance } from '../..';

channelInstance.post('/settings/language', async (req) => {
  const { lang } = req.data as { lang: string };

  chrome.storage.sync.set({
    language: lang,
  });
});
