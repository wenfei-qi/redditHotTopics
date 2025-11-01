export interface Topic {
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

export interface ApiResponse {
  success: boolean;
  data: Topic[];
  count: number;
  error?: string;
}
