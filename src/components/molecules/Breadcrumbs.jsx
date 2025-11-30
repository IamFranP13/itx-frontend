import { Link, useLocation } from 'react-router-dom';
import useProductDetail from '../../hooks/useProductDetail';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const isProductPage = pathnames[0] === 'product' && pathnames[1];
    const productId = isProductPage ? pathnames[1] : null;

    const { product } = useProductDetail(productId);

    const routeNameMap = {
        product: 'Product Details',
    };

    return (
        <nav className={styles.nav} aria-label="Breadcrumb">
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/" className={styles.link}>Home</Link>
                </li>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    let label = routeNameMap[value] || value;

                    if (isProductPage && value === productId && product) {
                        label = `${product.brand} ${product.model}`;
                    } else if (value === productId) {
                        label = '...';
                    }

                    return (
                        <li key={to} className={styles.item}>
                            <span className={styles.separator}>/</span>
                            {isLast ? (
                                <span className={styles.active} aria-current="page">
                                    {label}
                                </span>
                            ) : (
                                <Link to={to} className={styles.link}>{label}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;