import { Link } from 'react-router-dom';
import Breadcrumbs from '../molecules/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

const Header = () => {
    const { count } = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.topRow}>
                    <Link to="/" className={styles.title}>
                        MobileStore
                    </Link>
                    <div className={styles.cart}>
                        <span className={styles.cartLabel}>Cart:</span>
                        <span className={styles.badge}>
                            {count}
                        </span>
                    </div>
                </div>
                <Breadcrumbs />
            </div>
        </header>
    );
};

export default Header;
