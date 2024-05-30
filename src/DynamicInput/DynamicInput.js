// DynamicInput.js
import React from 'react';
import { TextField } from '@mui/material';
import ColorPicker from './ColorPicker';
import DynamicDropDown from './DynamicDropDown';
const DynamicInput = ({ propertyName, value, onChange }) => {
    const colorProperties = ['color', 'background-color', 'border-color','text-decoration-color'];
    const dropdownProperties = ['text-align', 'text-transform', 'flex-direction','text-decoration','font-weight','justify-content'];
    if (colorProperties.includes(propertyName)) {
        return <ColorPicker value={value} onChange={(e) => onChange(e.target.value)} />;
    }
    else if (dropdownProperties.includes(propertyName)) {
        return <DynamicDropDown value={value} optionType={propertyName} onChange={(e) => onChange(e.target.value)} />;

    }
    else {
        return (
            <TextField
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    }

};

export default DynamicInput;
