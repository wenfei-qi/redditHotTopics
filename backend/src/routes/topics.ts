import { Router, Request, Response } from 'express';
import { redditService, type SortOption, type TimeFilter } from '../services/reddit.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 25, 100);
    const sort = (req.query.sort as SortOption) || 'hot';
    const timeFilter = (req.query.time as TimeFilter) || 'day';
    const minScore = parseInt(req.query.minScore as string) || 0;
    const minComments = parseInt(req.query.minComments as string) || 0;
    const tag = (req.query.tag as string) || '';

    // Validate sort option
    const validSorts: SortOption[] = ['hot', 'new', 'top', 'rising'];
    if (!validSorts.includes(sort)) {
      res.status(400).json({
        error: 'Invalid sort option. Must be one of: hot, new, top, rising',
      });
      return;
    }

    // Validate time filter
    const validTimeFilters: TimeFilter[] = ['hour', 'day', 'week', 'month', 'year', 'all'];
    if (!validTimeFilters.includes(timeFilter)) {
      res.status(400).json({
        error: 'Invalid time filter. Must be one of: hour, day, week, month, year, all',
      });
      return;
    }

    const topics = await redditService.getTopics({
      limit,
      sort,
      timeFilter,
      minScore,
      minComments,
      tag,
    });

    res.json({
      success: true,
      data: topics,
      count: topics.length,
      filters: {
        sort,
        timeFilter,
        minScore,
        minComments,
        tag: tag || undefined,
      },
    });
  } catch (error) {
    console.error('Error in /topics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch topics',
    });
  }
});

// Keep legacy /hot endpoint for backwards compatibility
router.get('/hot', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 25, 100);

    const topics = await redditService.getTopics({ limit, sort: 'hot' });

    res.json({
      success: true,
      data: topics,
      count: topics.length,
    });
  } catch (error) {
    console.error('Error in /topics/hot:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hot topics',
    });
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    redditService.clearCache();
    const topics = await redditService.getTopics({ sort: 'hot' });

    res.json({
      success: true,
      message: 'Cache cleared and topics refreshed',
      data: topics,
      count: topics.length,
    });
  } catch (error) {
    console.error('Error in /topics/refresh:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh topics',
    });
  }
});

export default router;
