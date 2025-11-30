import { useState, useMemo } from 'react';

const useSearch = (products) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (!searchTerm) return products;

    const term = searchTerm.toLowerCase().trim();
    return products.filter((product) => {
      const brand = product.brand ? product.brand.toLowerCase() : '';
      const model = product.model ? product.model.toLowerCase() : '';

      return brand.includes(term) || model.includes(term);
    });
  }, [products, searchTerm]);

  return { searchTerm, setSearchTerm, filteredProducts };
};

export default useSearch;
