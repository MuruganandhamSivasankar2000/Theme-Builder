 import React, { useState } from 'react';
import { Dialog, TextField } from '@mui/material';
import { Button } from '@mui/material';

function SaveDailog({ open, onClose, onSave }) {
    const [formValue, setFormValue] = useState('');

    const handleInputChange = (e) => {
        setFormValue(e.target.value);
    };

    const handleSave = () => {
        onSave(formValue);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div style={{margin:'60px'}}>
                <TextField  id="outlined-basic" label="Write a Variation Name" variant="outlined" value={formValue} onChange={handleInputChange} />
                <br/>
                <br/>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </div>
        </Dialog>
    );
}

export default SaveDailog;
