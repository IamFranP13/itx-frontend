import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../atoms/Image';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.imgUrl}
                        alt={`${product.brand} ${product.model}`}
                        className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.brand}>{product.brand}</h3>
                    <h2 className={styles.model}>{product.model}</h2>
                    <p className={styles.price}>
                        {product.price ? `${product.price} €` : 'Price not available'}
                    </p>
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        price: PropTypes.string,
    }).isRequired,
};

export default ProductCard;
