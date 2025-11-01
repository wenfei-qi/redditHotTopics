import type { RedditResponse, SimplifiedTopic } from '../types/reddit.js';
import { generateTags } from './tagGenerator.js';

const REDDIT_BASE_URL = 'https://www.reddit.com/r/answers';
const USER_AGENT = 'Mozilla/5.0 (compatible; RedditAnswersTracker/1.0)';

export type SortOption = 'hot' | 'new' | 'top' | 'rising';
export type TimeFilter = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export interface FetchOptions {
  limit?: number;
  sort?: SortOption;
  timeFilter?: TimeFilter;
  minScore?: number;
  minComments?: number;
  tag?: string;
}

export class RedditService {
  private cache: Map<string, { data: SimplifiedTopic[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async getTopics(options: FetchOptions = {}): Promise<SimplifiedTopic[]> {
    const {
      limit = 25,
      sort = 'hot',
      timeFilter = 'day',
      minScore = 0,
      minComments = 0,
      tag = '',
    } = options;

    // Create cache key based on options
    const cacheKey = `${sort}_${timeFilter}_${limit}_${minScore}_${minComments}_${tag}`;

    // Check cache
    const now = Date.now();
    const cached = this.cache.get(cacheKey);
    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Build URL based on sort option
      let url = `${REDDIT_BASE_URL}/${sort}.json?limit=${limit * 3}`; // Fetch more to account for filtering

      // Add time filter for 'top' sort
      if (sort === 'top') {
        url += `&t=${timeFilter}`;
      }

      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
        },
      });

      if (!response.ok) {
        throw new Error(`Reddit API returned ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as RedditResponse;
      let topics = this.transformRedditData(data);

      // Apply filters
      topics = topics.filter(
        (topic) => topic.score >= minScore && topic.commentCount >= minComments
      );

      // Apply tag filter if specified
      if (tag) {
        topics = topics.filter((topic) =>
          topic.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
        );
      }

      // Limit to requested amount after filtering
      topics = topics.slice(0, limit);

      // Update cache
      this.cache.set(cacheKey, {
        data: topics,
        timestamp: now,
      });

      return topics;
    } catch (error) {
      console.error('Error fetching Reddit data:', error);
      throw new Error('Failed to fetch topics from Reddit');
    }
  }

  private transformRedditData(data: RedditResponse): SimplifiedTopic[] {
    return data.data.children
      .filter((child) => child.kind === 't3') // Only posts
      .map((child) => {
        const post = child.data;

        // Extract thumbnail if available
        let thumbnail: string | undefined;
        if (post.thumbnail && post.thumbnail.startsWith('http')) {
          thumbnail = post.thumbnail;
        } else if (post.preview?.images?.[0]?.source?.url) {
          thumbnail = post.preview.images[0].source.url.replace(/&amp;/g, '&');
        }

        // Create excerpt from selftext
        const excerpt = post.selftext
          ? post.selftext.substring(0, 200) + (post.selftext.length > 200 ? '...' : '')
          : '';

        // Generate tags based on title and content
        const tags = generateTags(post.title, post.selftext);

        return {
          id: post.id,
          title: post.title,
          author: post.author,
          score: post.score,
          commentCount: post.num_comments,
          createdAt: new Date(post.created_utc * 1000).toISOString(),
          url: post.url,
          redditUrl: `https://www.reddit.com${post.permalink}`,
          excerpt,
          thumbnail,
          tags,
        };
      });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const redditService = new RedditService();
