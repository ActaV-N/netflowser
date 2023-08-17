import { genres } from './data';

export type Language = Exclude<keyof (typeof genres)[number], 'code'>;

class ChromeStorage {
  private static instance = new this();

  private storage: {
    genres: typeof genres;
    language: Language;
    likes: number[];
  } = {
    genres,
    language: 'ko',
    likes: [],
  };

  private constructor() {
    this.set('genres', this.storage.genres, 'local');
    this.set('language', this.storage.language);
    this.set('likes', this.storage.likes);
  }

  public static getInstance() {
    if (!ChromeStorage.instance) {
      ChromeStorage.instance = new ChromeStorage();
    }
    return ChromeStorage.instance;
  }

  public async set(key: string, value: any, storageType: 'local' | 'sync' = 'sync') {
    return chrome.storage[storageType].set({
      [key]: value,
    });
  }

  public async get(
    keys: keyof typeof this.storage | (keyof typeof this.storage)[],
    storageType: 'local' | 'sync' = 'sync',
  ) {
    return chrome.storage[storageType].get(keys) as Promise<{
      genres: typeof genres;
      language: Language;
      likes: number[];
    }>;
  }
}

export const chromeStorage = ChromeStorage.getInstance();
