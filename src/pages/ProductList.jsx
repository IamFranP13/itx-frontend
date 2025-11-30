import SearchBar from '../components/molecules/SearchBar';
import ProductCard from '../components/organisms/ProductCard';
import useProductList from '../hooks/useProductList';
import useSearch from '../hooks/useSearch';
import styles from './ProductList.module.css';

const ProductList = () => {
    const { products, loading, error } = useProductList();
    const { searchTerm, setSearchTerm, filteredProducts } = useSearch(products);

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.page}>
                <div className={styles.error}>
                    Error loading products. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                {filteredProducts.length === 0 ? (
                    <div className={styles.empty}>No products found.</div>
                ) : (
                    <div className={styles.grid}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
