import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({ value, onChange, placeholder, type = 'text', className = '' }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
        />
    );
};

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default Input;
