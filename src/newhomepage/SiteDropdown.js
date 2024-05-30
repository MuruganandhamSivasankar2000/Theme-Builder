import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'

const SiteDropdown = () => {
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
        // setSiteName(event);
    }
    return (
        <div>
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
    )
}

export default SiteDropdown;