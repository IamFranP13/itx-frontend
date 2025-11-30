import { mapProductToModel, mapProductDetailToModel } from '../utils/mappers';

const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/product`);
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.map(mapProductToModel);
};

export const getProductDetail = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product details');
  const data = await response.json();
  return mapProductDetailToModel(data);
};

export const addToCart = async (id, colorCode, storageCode) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      colorCode,
      storageCode,
    }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
};
