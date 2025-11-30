import * as storage from './storage';

/**
 * Cache Service - Handles transparent caching with automatic expiration
 * Implements the "Fetch -> Check Time -> Serve/Refetch" pattern
 */
const CacheService = {
  /**
   * Fetches data with automatic caching
   * @param {string} key - Cache key
   * @param {Function} fetchFn - Async function to fetch fresh data
   * @returns {Promise} - Cached or fresh data
   */
  async fetchWithCache(key, fetchFn) {
    // Try to get from cache first
    const cachedData = storage.get(key);

    if (cachedData !== null) {
      return cachedData;
    }

    // Cache miss or expired - fetch fresh data
    const freshData = await fetchFn();
    storage.save(key, freshData);

    return freshData;
  },

  /**
   * Invalidates cache for a specific key
   * @param {string} key - Cache key to invalidate
   */
  invalidate(key) {
    storage.remove(key);
  },

  /**
   * Clears all cache
   */
  clearAll() {
    localStorage.clear();
  },
};

export default CacheService;
