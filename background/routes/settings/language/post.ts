import { chromeStorage } from 'background/storage';
import { channelInstance } from '../..';

channelInstance.post('/settings/language', async (req) => {
  const { lang } = req.data as { lang: string };

  await chromeStorage.set('language', lang);
});
