import { chromeStorage } from 'background/storage';
import { channelInstance } from '../..';

channelInstance.post('/genres/like', async (req) => {
  const { id } = req.data as { id: number };

  const { likes } = await chromeStorage.get(['likes', 'language']);

  let newLikes: number[] = [];
  let liked: boolean = false;

  if (likes.includes(id)) {
    newLikes = likes.filter((like) => like !== id);
  } else {
    newLikes = [...likes, id];
    liked = true;
  }

  await chromeStorage.set('likes', newLikes);

  return {
    id,
    liked,
  };
});
