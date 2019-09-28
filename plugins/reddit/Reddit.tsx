import * as React from 'react';
import * as moment from 'moment';
import { PluginContainer, IPluginContainerProps } from '@app/components';
import { Subreddit, Post } from './models';
import { RedditService } from './services';
import './Reddit.scss';

interface IProps extends IPluginContainerProps {
  subreddits: string[];
}

interface IState {
  isLoaded: boolean;
  subreddits: Subreddit[];
  currentSubreddit: Subreddit;
  currentSubredditIndex: number;
}

export default class Reddit extends React.Component<IProps, IState> {

  static defaultProps: IProps = {
    subreddits: [],
  };

  private interval: NodeJS.Timeout;
  private redditService: RedditService;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoaded: false,
      subreddits: [],
      currentSubreddit: null,
      currentSubredditIndex: 0,
    };

    this.redditService = new RedditService();
  }

  componentDidMount() {
    this.interval = setInterval(async () => {
      await this.showNextSubreddit();
    }, 10000);

    setTimeout(async () => {
      await this.showNextSubreddit();
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async showNextSubreddit() {
    if (!this.state.isLoaded) {
      this.initializeSubreddits();
    }

    let currentSubredditIndex = this.state.currentSubredditIndex < this.state.subreddits.length - 1
      ? this.state.currentSubredditIndex + 1
      : 0;
    let currentSubreddit = this.state.subreddits[currentSubredditIndex];

    await this.updatePosts(currentSubreddit);

    console.log('currentSubreddit', currentSubreddit);

    this.setState({ currentSubreddit, currentSubredditIndex });
  }

  initializeSubreddits() {
    let subreddits = new Array<Subreddit>();

    for (let subreddit of this.props.subreddits) {
      subreddits.push(new Subreddit(subreddit, []));
    }

    this.setState({
      isLoaded: true,
      subreddits,
      currentSubredditIndex: -1,
    });
  }

  async updatePosts(subreddit: Subreddit) {
    subreddit.posts = await this.redditService.getPosts(subreddit.name);
  }

  render() {
    return (
      <PluginContainer position={this.props.position} size={this.props.size}>
        {this.state.currentSubreddit && (
          <div className="reddit">
            <h2 className="reddit__subreddit">Latest posts from r/{this.state.currentSubreddit.name}</h2>
            {this.state.currentSubreddit.posts.map((post, index) => this.renderPost(post, index))}
          </div>
        )}
      </PluginContainer>
    );
  }

  renderPost(post: Post, index: number) {
    return (
      <div className="reddit__post" key={index}>
        <div className="reddit__score">
          <span className="reddit__score-number">{post.score}</span>
        </div>
        <div className="reddit__content">
          <h3 className="reddit__title">{post.title}</h3>
          <ul className="reddit__meta-list">
            <li className="reddit__meta-item">
              Posted by u/{post.author}
            </li>
            <li className="reddit__meta-item">
              {moment.unix(post.created).fromNow()}
            </li>
            <li className="reddit__meta-item">
              {post.commentsCount} comments
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
