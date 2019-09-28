import * as moment from 'moment';
import { ICacheItem } from "./cache-item";

const SEPARATOR = '.';

export class CacheStorage {

  constructor(
    private context: string,
    private storage: Storage = localStorage
  ) {}

  get(key: string | string[]): ICacheItem {
    return JSON.parse(this.storage.getItem(this.contextualizeKey(key))) as ICacheItem;
  }

  set(key: string | string[], value: any, expiresIn: number) {
    let expiresAt = moment().add(expiresIn, 'seconds');

    this.storage.setItem(this.contextualizeKey(key), JSON.stringify({
      value,
      expiresAt,
    }));
  }

  has(key: string | string[]): boolean {
    return this.storage.getItem(this.contextualizeKey(key)) !== null;
  }

  hasExpired(key: string | string[]): boolean {
    if (!this.has(key)) {
      return true;
    }

    let item = this.get(key);
    if (!item.expiresAt) {
      return true;
    }

    let expiresAt = moment(item.expiresAt);

    return moment().isAfter(expiresAt);
  }

  remove(key: string) {
    this.storage.removeItem(this.contextualizeKey(key));
  }

  private contextualizeKey(key: string | string[]): string {
    let result: string;

    if (typeof key === 'string') {
      result = this.context.concat(SEPARATOR, key);
    }

    result = [this.context].concat(key).join(SEPARATOR);

    return result.toLowerCase();
  }
}
