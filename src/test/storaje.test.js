import { describe, it, expect, beforeEach, vi } from 'vitest';
import { save, get, remove } from '../services/storage';

describe('Storage Service', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('must save and retrieve a value correctly', () => {
        const key = 'test_key';
        const data = { id: 1, name: 'Product' };

        save(key, data);
        const result = get(key);

        expect(result).toEqual(data);
    });

    it('must return null if the data has expired (> 1 hour)', () => {
        const key = 'expired_key';
        save(key, 'some data');

        const ONE_HOUR_PLUS = (3600 * 1000) + 1;
        vi.advanceTimersByTime(ONE_HOUR_PLUS);

        const result = get(key);

        expect(result).toBeNull();
        expect(localStorage.getItem(key)).toBeNull();
    });

    it('must return the data if it has not expired', () => {
        const key = 'valid_key';
        save(key, 'fresh data');

        const FIFTY_NINE_MINUTES = (59 * 60 * 1000);
        vi.advanceTimersByTime(FIFTY_NINE_MINUTES);

        const result = get(key);

        expect(result).toBe('fresh data');
    });
});