import { describe, it, expect } from 'vitest';
import { mapProductToModel, mapProductDetailToModel } from '../utils/mappers';

describe('Mappers Utils', () => {
    it('mapProductToModel must manage nulls', () => {
        const result = mapProductToModel(null);
        expect(result).toBeNull();
    });

    it('mapProductToModel must fill missing data with defaults', () => {
        const incompleteApiData = { id: '123', model: 'TestModel' };

        const result = mapProductToModel(incompleteApiData);

        expect(result.id).toBe('123');
        expect(result.model).toBe('TestModel');
        expect(result.brand).toBe('Unknown Brand');
        expect(result.price).toBe('');
    });

    it('mapProductDetailToModel must correct the typo "secondaryCmera"', () => {
        const apiData = {
            id: '1',
            brand: 'X',
            model: 'Y',
            secondaryCmera: '12MP' // API real typo 
        };

        const result = mapProductDetailToModel(apiData);

        expect(result.secondaryCamera).toBe('12MP');
        expect(result.secondaryCmera).toBeUndefined();
    });
});