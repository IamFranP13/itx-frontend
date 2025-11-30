import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Image from '../components/atoms/Image';
import Button from '../components/atoms/Button';
import useProductDetail from '../hooks/useProductDetail';
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { product, loading, error } = useProductDetail(id);
    const { addProductToCart } = useCart();

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (product) {
            if (product.options?.colors?.length > 0) {
                setSelectedColor(product.options.colors[0].code);
            }
            if (product.options?.storages?.length > 0) {
                setSelectedStorage(product.options.storages[0].code);
            }
        }
    }, [product]);

    const handleAddToCart = async () => {
        if (!selectedColor || !selectedStorage) return;

        try {
            setAdding(true);
            await addProductToCart(id, selectedColor, selectedStorage);
            alert('Product added to cart!');
        } catch (err) {
            console.error('Failed to add product', err);
            alert('Could not add product to cart.');
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error loading product.</div>;
    if (!product) return null;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.backLinkWrapper}>
                    <Link to="/" className={styles.backLink}>&larr; Back to list</Link>
                </div>

                <div className={styles.content}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={product.imgUrl}
                            alt={`${product.brand} ${product.model}`}
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.details}>
                        <div className={styles.headerInfo}>
                            <h1 className={styles.model}>{product.model}</h1>
                            <h2 className={styles.brand}>{product.brand}</h2>
                            <p className={styles.price}>
                                {product.price ? `${product.price} €` : 'Price not available'}
                            </p>
                        </div>

                        <div className={styles.specs}>
                            <p className={styles.specItem}><strong>CPU:</strong> {product.cpu}</p>
                            <p className={styles.specItem}><strong>RAM:</strong> {product.ram}</p>
                            <p className={styles.specItem}><strong>OS:</strong> {product.os}</p>
                            <p className={styles.specItem}><strong>Display:</strong> {product.displayResolution}</p>
                            <p className={styles.specItem}><strong>Battery:</strong> {product.battery}</p>
                            <p className={styles.specItem}><strong>Cameras:</strong> {product.primaryCamera} (Rear), {product.secondaryCamera} (Front)</p>
                            <p className={styles.specItem}><strong>Dimensions:</strong> {product.dimentions}</p>
                            <p className={styles.specItem}><strong>Weight:</strong> {product.weight ? `${product.weight}g` : 'N/A'}</p>
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.optionGroup}>
                                <label className={styles.label}>Storage</label>
                                <div className={styles.options}>
                                    {product.options?.storages?.map((storage) => (
                                        <button
                                            key={storage.code}
                                            onClick={() => setSelectedStorage(storage.code)}
                                            className={`${styles.optionBtn} ${selectedStorage === storage.code ? styles.selected : ''}`}
                                        >
                                            {storage.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.optionGroup}>
                                <label className={styles.label}>Color</label>
                                <div className={styles.options}>
                                    {product.options?.colors?.map((color) => (
                                        <button
                                            key={color.code}
                                            onClick={() => setSelectedColor(color.code)}
                                            className={`${styles.optionBtn} ${selectedColor === color.code ? styles.selected : ''}`}
                                        >
                                            {color.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                disabled={adding || !selectedColor || !selectedStorage}
                                className={styles.addButton}
                            >
                                {adding ? 'Adding...' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;