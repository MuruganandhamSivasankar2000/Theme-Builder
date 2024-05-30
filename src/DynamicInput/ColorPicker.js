import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useProjectConfig } from '../config/ProjectConfigProvider';

const ColorPicker = ({ value, onChange }) => {
  const { currentTheme } = useProjectConfig();
  const [currentThemeColor, setCurrentThemeColor] = useState({});
  useEffect(() => {
    console.log(JSON.parse(currentTheme));  
    setCurrentThemeColor(JSON.parse(currentTheme));
  }, [currentTheme])
  console.log(currentThemeColor);
  const colorOptions = {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#2e7d32',
    error: '#d32f2f',
    warning: '#ed6c02',
    info: '#0288d1',
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Color</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Color"
      >
        {Object.entries(colorOptions).map(([key, colorValue]) => (
          <MenuItem key={key} value={colorValue}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorPicker;


// import { TextField } from '@mui/material'
// import React from 'react'

// const ColorPicker = ({ value, onChange }) => {

//     return (
//         <div>
//             <TextField
//                 type="color"
//                 value={value}
//                 onChange={onChange}
//                 fullWidth
//                 variant="outlined"
//             />
//         </div>
//     )
// }

// export default ColorPicker;