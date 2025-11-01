export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  url: string;
  permalink: string;
  selftext: string;
  thumbnail?: string;
  preview?: {
    images: Array<{
      source: {
        url: string;
        width: number;
        height: number;
      };
    }>;
  };
}

export interface RedditChild {
  kind: string;
  data: RedditPost;
}

export interface RedditResponse {
  kind: string;
  data: {
    children: RedditChild[];
    after: string | null;
    before: string | null;
  };
}

export interface SimplifiedTopic {
  id: string;
  title: string;
  author: string;
  score: number;
  commentCount: number;
  createdAt: string;
  url: string;
  redditUrl: string;
  excerpt: string;
  thumbnail?: string;
  tags: string[];
}
