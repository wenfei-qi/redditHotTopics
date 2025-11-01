import type { ApiResponse } from '../types/reddit';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export type SortOption = 'hot' | 'new' | 'top' | 'rising';
export type TimeFilter = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export interface FetchOptions {
  limit?: number;
  sort?: SortOption;
  time?: TimeFilter;
  minScore?: number;
  minComments?: number;
  tag?: string;
}

export const api = {
  async getTopics(options: FetchOptions = {}): Promise<ApiResponse> {
    try {
      const {
        limit = 25,
        sort = 'hot',
        time = 'day',
        minScore = 0,
        minComments = 0,
        tag = '',
      } = options;

      const params = new URLSearchParams({
        limit: limit.toString(),
        sort,
        time,
        minScore: minScore.toString(),
        minComments: minComments.toString(),
      });

      if (tag) {
        params.append('tag', tag);
      }

      const response = await fetch(`${API_BASE_URL}/topics?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }
  },

  async refreshTopics(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/topics/refresh`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error refreshing topics:', error);
      throw error;
    }
  },
};
