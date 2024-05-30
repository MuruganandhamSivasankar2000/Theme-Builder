import { TextField } from '@mui/material'
import React from 'react'

const ColorPick = ({ id, label, value, onChange }) => {

    return (
        <div>
            <TextField
                id={id}
                label={label}
                type="color"
                value={value}
                onChange={onChange}
                fullWidth
                variant="outlined"
            />
        </div>
    )
}

export default ColorPick