import { Store } from 'confidence';
import ormconfig from './ormconfig';

const doc = {
  ormconfig,
};

const store = new Store(doc);

export const getConfig = (key: string) => store.get(key);
