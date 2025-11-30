import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetail from '../pages/ProductDetail';
import * as useProductDetailHook from '../hooks/useProductDetail';

vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: '123' }),
    Link: ({ children }) => <a href="/">{children}</a>,
}));

vi.mock('../hooks/useProductDetail');

vi.mock('../context/CartContext', () => ({
    useCart: () => ({ addProductToCart: vi.fn() }),
}));

describe('ProductDetail Page', () => {

    it('must disable the button and show "Not Available" if the product does not have a price', () => {
        vi.spyOn(useProductDetailHook, 'default').mockReturnValue({
            loading: false,
            error: null,
            product: {
                id: '1',
                brand: 'Acer',
                model: 'No price',
                price: '',
                imgUrl: 'test.jpg',
                options: { colors: [], storages: [] }
            }
        });

        render(<ProductDetail />);

        const button = screen.getByRole('button', { name: /not available/i });

        expect(button.textContent).toMatch(/not available/i);
        expect(button.disabled).toBe(true);
    });

    it('must show "Add to Cart" if the product has a price', () => {
        vi.spyOn(useProductDetailHook, 'default').mockReturnValue({
            loading: false,
            error: null,
            product: {
                id: '1',
                brand: 'Acer',
                model: 'with price',
                price: '200',
                imgUrl: 'test.jpg',
                options: {
                    colors: [{ code: 1, name: 'Black' }],
                    storages: [{ code: 2, name: '64GB' }]
                }
            }
        });

        render(<ProductDetail />);

        const button = screen.getByRole('button', { name: /add to cart/i });

        expect(button.textContent).toMatch(/add to cart/i);
    });
});