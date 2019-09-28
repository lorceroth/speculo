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

  async getPosts(subreddit: string): Promise<Post[]> {
    if (this.cacheStorage.hasExpired(subreddit)) {
      return await this.getPostsFromReddit(subreddit);
    }

    return this.getPostsFromCache(subreddit);
  }

  private async getPostsFromReddit(subreddit: string): Promise<Post[]> {
    console.log('Get posts from reddit', subreddit);
    let url = BASE_URL.concat(`/r/${subreddit}.json?limit=10`);

    let response = await axios.get(url);
    let data = response.data;

    let posts = (data.data.children as any[]).map(item =>
      Post.createFromResponse(item.data));

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
