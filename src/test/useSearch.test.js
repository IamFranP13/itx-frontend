import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSearch from '../hooks/useSearch';

const mockProducts = [
    { id: 1, brand: 'Apple', model: 'iPhone 17' },
    { id: 2, brand: 'Samsung', model: 'Galaxy S25' },
    { id: 3, brand: 'Xiaomi', model: 'Redmi Note 12' }
];

describe('useSearch Hook', () => {
    it('must return all products initially (empty search)', () => {
        const { result } = renderHook(() => useSearch(mockProducts));

        expect(result.current.searchTerm).toBe('');
        expect(result.current.filteredProducts).toHaveLength(3);
    });

    it('must filter products correctly (case insensitive)', () => {
        const { result } = renderHook(() => useSearch(mockProducts));

        act(() => {
            result.current.setSearchTerm('samsung');
        });

        expect(result.current.filteredProducts).toHaveLength(1);
        expect(result.current.filteredProducts[0].brand).toBe('Samsung');
    });

    it('must filter products by model also', () => {
        const { result } = renderHook(() => useSearch(mockProducts));

        act(() => {
            result.current.setSearchTerm('iPhone');
        });

        expect(result.current.filteredProducts[0].model).toBe('iPhone 17');
    });

    it('must return empty array if no matches', () => {
        const { result } = renderHook(() => useSearch(mockProducts));

        act(() => {
            result.current.setSearchTerm('Nokia 3310');
        });

        expect(result.current.filteredProducts).toHaveLength(0);
    });
});