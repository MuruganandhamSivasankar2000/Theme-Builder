import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const ThemeSelector = () => {
    const [generalThemes, setGeneralThemes] = useState({});
    const [currentTheme, setCurrentTheme] = useState({});
    const [projectName, setProjectName] = useState('wknd');

    useEffect(() => {
        // Fetch general theme data when projectName changes
        if (projectName) {
            axios.get(`http://localhost:8000/getGeneralTheme/${projectName}`)
                .then((response) => {
                    console.log(response.data);
                    setGeneralThemes(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching general theme:', error);
                });
        }

    }, [projectName]);
    const [siteSelected, setSiteSelected] = useState('');
    const [selectedSiteTheme, setSelectedSiteTheme] = useState({});
    useEffect(() => {
        if (projectName) {
            axios.get(`http://localhost:8000/getSiteSpecificTheme/${projectName}/${siteSelected}`)
                .then((response) => {
                    console.log(response.data);
                    setSelectedSiteTheme(response.data);
                    setCurrentTheme(response.data);
                    localStorage.setItem('currentTheme',JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log("No theme for ", siteSelected);
                });
        }
    }, [siteSelected]);
    // console.log(selectedSiteTheme);
    const [siteOptions, setSiteOptions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/bin/sitelist')
            .then(response => {
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("No Json");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const siteCodes = Object.values(data);
                setSiteOptions(siteCodes);
            })
            .catch(error => {
                console.error('Error fetching site codes:', error);
            });
    }, []);
    const handleSiteChange = (event) => {
        console.log(event);
        setSiteSelected(event);
        
    }
    const [selectedKey, setSelectedKey] = useState('');
    const handleKeyChange = (event) => {
        const key = event.target.value;
        setSelectedKey(key);
        const values = generalThemes[key];
        localStorage.setItem('currentTheme',JSON.stringify(values));
        console.log('Selected key:', key);
        console.log('Values:', values);
    };
    return (
        <div>
          
            <FormControl fullWidth>
                <InputLabel>General Themes</InputLabel>
                <Select
                    value={selectedKey}
                    onChange={handleKeyChange}
                >
                    <MenuItem value="">Select a theme</MenuItem>
                    {Object.keys(generalThemes).map((key) => (
                        <MenuItem key={key} value={key}>
                            {key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Select Site</InputLabel>
                <Select
                    className="select-option"
                    onChange={(e) => handleSiteChange(e.target.value)}
                >
                    {siteOptions.map((site, index) => (
                        <MenuItem key={index} value={site}>
                            {site}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
           
        </div>
    );
};

export default ThemeSelector;
