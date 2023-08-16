import { channelInstance } from '../..';

channelInstance.post('/genres/like', async (req) => {
  const { id } = req.data as { id: number };
  const { likes } = (await chrome.storage.sync.get(['likes'])) as { likes: number[] };

  let newLikes: number[] = [];
  let liked: boolean = false;

  if (likes.includes(id)) {
    newLikes = likes.filter((like) => like !== id);
  } else {
    newLikes = [...likes, id];
    liked = true;
  }

  await chrome.storage.sync.set({
    likes: newLikes,
  });

  return {
    id,
    liked,
  };
});
