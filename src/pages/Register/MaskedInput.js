import React from 'react'
import InputMask from 'react-input-mask'

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({mask, className, placeholder, value, onChange, disabled, onBlur, required}) => {
    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target,
                value: onlyNumbers(event.target.value)
            }
        });
    }

    return <InputMask
    mask={mask} 
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={handleChange} 
    disabled={disabled}
    onBlur={onBlur}
    required={required}
    maskChar={false}
    />;
}

export default MaskedInput;