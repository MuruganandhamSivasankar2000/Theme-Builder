import { InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const DynamicDropDown = ({ value, onChange, optionType }) => {


    let options = [];
    switch (optionType) {
        case 'justify-content':
            options = ['start', 'sapce-around', 'space-between', 'space-evenly', 'baseline', 'center', 'end', 'first baseline', 'flex-end', 'flex-start', 'last baseline', 'left', 'right', 'safe'];
            break;
        case 'text-align':
            options = ['start', 'center', 'left', 'right', 'justify', 'end'];
            break;
        case 'flex-direction':
            options = ['row', 'row-reverse', 'column', 'column-reverse'];
            break;
        case 'text-transform':
            options = ['uppercase', 'lowercase'];
            break;
        case 'font-weight':
            options = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
            break;
            case 'text-decoration':
            options = ['none','underline','dashed','dotted','double','line-through','overline','solid','wavy'];
            break;
        default:
            options = ['nothing to display'];
    }
    return (
        <div>
            {/* <InputLabel id="select-label">{label}</InputLabel> */}
            <Select
                labelId="select-label"
                id="demo-simple-select"
                label="Flex Direction" value={value} onChange={onChange}>
                {
                    options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))
                }

            </Select>
        </div>
    )
}

export default DynamicDropDown;