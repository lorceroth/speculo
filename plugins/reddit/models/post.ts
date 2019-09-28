export class Post {

  constructor(
    public title: string,
    public author: string,
    public score: number,
    public commentsCount: number,
    public created: number
  ) {}

  static createFromResponse(obj: any): Post {
    return new Post(
      obj.title,
      obj.author,
      obj.score,
      obj.num_comments,
      obj.created_utc
    );
  }
}
