import { Post } from "./post";

export class Subreddit {

  constructor(
    public name: string,
    public posts: Post[]
  ) {}
}
