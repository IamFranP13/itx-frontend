import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, save } from '../services/storage';
import { addToCart as apiAddToCart } from '../services/api';

const CartContext = createContext();
const CART_KEY = 'cart_count';

export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const savedCount = get(CART_KEY);
        if (savedCount !== null && savedCount !== undefined) {
            setCount(Number(savedCount));
        }
    }, []);

    const addProductToCart = async (id, colorCode, storageCode) => {
        try {
            const response = await apiAddToCart(id, colorCode, storageCode);

            setCount(prevCount => {
                const newCount = prevCount + 1;
                save(CART_KEY, newCount);
                return newCount;
            });

            return true;
        } catch (error) {
            console.error('[CartContext] Error adding to cart:', error);
            throw error;
        }
    };

    const value = {
        count,
        addProductToCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};