import * as moment from 'moment';
import axios from 'axios';
import { CacheStorage } from '@app/cache';
import { Post } from '../models';

const BASE_URL = 'https://www.reddit.com';
const CACHE_TIME = 600;

export class RedditService {

  constructor(
    private cacheStorage: CacheStorage = new CacheStorage('reddit')
  ) {}

  async getPosts(subreddit: string, limit: number): Promise<Post[]> {
    if (this.cacheStorage.hasExpired(subreddit)) {
      return await this.getPostsFromReddit(subreddit, limit);
    }

    return this.getPostsFromCache(subreddit);
  }

  private async getPostsFromReddit(subreddit: string, limit: number): Promise<Post[]> {
    console.log('Get posts from reddit', subreddit);
    let url = BASE_URL.concat(`/r/${subreddit}.json?limit=${limit}`);

    let response = await axios.get(url);
    let content = (response.data.data.children as any[]).slice(0, limit);

    let posts = content.map(item =>
      Post.createFromObject(item.data));

    this.cacheStorage.set(subreddit, posts, CACHE_TIME);

    return posts;
  }

  private getPostsFromCache(subreddit: string): Post[] {
    console.log('Get posts from cache', subreddit);

    let postsCacheItem = this.cacheStorage.get(subreddit);
    let posts = postsCacheItem.value as Post[];

    return posts;
  }
}
