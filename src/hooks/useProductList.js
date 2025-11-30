import { getProducts } from '../services/api';
import useCachedFetch from './useCachedFetch';

const PRODUCTS_KEY = 'products_list';

const useProductList = () => {
  const { data: products, loading, error } = useCachedFetch(PRODUCTS_KEY, getProducts, []);

  return { products: products || [], loading, error };
};

export default useProductList;
