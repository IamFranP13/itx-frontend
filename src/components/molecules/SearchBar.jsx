import React from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search brand or model..."
                />
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SearchBar;
