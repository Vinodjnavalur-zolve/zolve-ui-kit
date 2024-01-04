import React from 'react';

// styles
import './styles.css'

const InputGroup = ({
    value
}) => {
    return (
        <div className="z-input-group">
            <input className="z-input-group__input" value={value ?? 'check'} />
        </div>
    );
}

export default InputGroup;
