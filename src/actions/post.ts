"use server";

import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client.
// It will automatically use UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from environment variables.
const redis = Redis.fromEnv();

export async function getPostStats(slug: string) {
  try {
    // Fetch views and likes in parallel
    const [views, likes] = await Promise.all([
      redis.get<number>(`post:views:${slug}`),
      redis.get<number>(`post:likes:${slug}`),
    ]);

    return {
      views: views || 0,
      likes: likes || 0,
    };
  } catch (error) {
    console.error(`Failed to fetch stats for post ${slug}:`, error);
    return { views: 0, likes: 0 };
  }
}

export async function incrementView(slug: string) {
  try {
    const views = await redis.incr(`post:views:${slug}`);
    return { views };
  } catch (error) {
    console.error(`Failed to increment views for post ${slug}:`, error);
    return { views: 0 };
  }
}

export async function incrementLike(slug: string, amount: number = 1) {
  try {
    // Safe cap to prevent malicious flooding of likes in a single request
    const safeAmount = Math.min(Math.max(amount, 1), 10);
    const likes = await redis.incrby(`post:likes:${slug}`, safeAmount);
    return { likes };
  } catch (error) {
    console.error(`Failed to increment likes for post ${slug}:`, error);
    return { likes: 0 };
  }
}
