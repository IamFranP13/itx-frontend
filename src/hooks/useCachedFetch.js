import { useState, useEffect } from 'react';
import cacheService from '../services/cache';

/**
 * Generic hook for fetching data with automatic caching
 * @param {string} cacheKey - Key for caching
 * @param {Function} fetchFn - Async function to fetch data
 * @param {Array} dependencies - Dependencies for refetching
 * @returns {Object} - { data, loading, error, refetch }
 */
const useCachedFetch = (cacheKey, fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await cacheService.fetchWithCache(cacheKey, fetchFn);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = () => {
    cacheService.invalidate(cacheKey);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useCachedFetch;
