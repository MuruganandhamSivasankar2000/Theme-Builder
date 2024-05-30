import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const DisplayComponent = ({ styleGroups, keysArray, handleSelectedVariation }) => {
  const [matchedGroups, setMatchedGroups] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState({});

  useEffect(() => {
    // console.log(styleGroups);
    // console.log(keysArray);
    const matched = keysArray.reduce((acc, key) => {
      if (styleGroups[key]) {
        acc.push({ key, styles: styleGroups[key] });
      }
      return acc;
    }, []);
    setMatchedGroups(matched);
  }, [styleGroups, keysArray]);
  // console.log(matchedGroups);

  const handleChange = (key, event, styleGroupLabel, styleLabel) => {
    const selectedValue = event.target.value;
    console.log(key);
    console.log(event.target.value);
    console.log(`Selected style group ${styleGroupLabel}`);
    console.log(`Selected style label ${styleLabel}`);

    console.log(`Selected value for ${key}: ${selectedValue}`);
    localStorage.setItem("currentcmpvariation", selectedValue);
    setSelectedStyles(prev => ({ ...prev, [key]: selectedValue }));
    // const myString = "cmp-button cmp-card";
    const selectedValueArr = selectedValue.split(" ");
    console.log(selectedValueArr);
    handleSelectedVariation(selectedValueArr,styleGroupLabel,styleLabel);
  };

  return (
    <div>
      {matchedGroups.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: '0.5', borderBottom: '2px solid #3f4240' }}>No matching groups found</p>
      ) : (
        matchedGroups.map((group, index) => (
          <div key={index}>
            <h4 style={{ textAlign: 'center', borderBottom: '2px solid #3f4240' }}>{group.key.charAt(0).toUpperCase() + group.key.slice(1)} Variations</h4>
            {group.styles.map((styleGroup, idx) => (
              <FormControl key={idx} fullWidth margin="normal">
                <InputLabel>{styleGroup.styleGroupLabel}</InputLabel>
                <Select
                  value={selectedStyles[`${group.key}-${idx}`] || ''}
                  onChange={(event) => handleChange(`${group.key}-${idx}`, event, styleGroup.styleGroupLabel, styleGroup.stylesInfo.find(style => style.cssClasses === event.target.value)?.styleLabel)}
                >
                  {styleGroup.stylesInfo.map((style, id) => (
                    <MenuItem key={id} value={style.cssClasses}>
                      {style.styleLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayComponent;

