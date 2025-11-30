import { useState, useEffect } from 'react';
import { getProductDetail } from '../services/api';

const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductDetail(id);
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      // If no ID, reset state
      setProduct(null);
      setLoading(false);
      setError(null);
    }
  }, [id]);

  return { product, loading, error };
};

export default useProductDetail;
