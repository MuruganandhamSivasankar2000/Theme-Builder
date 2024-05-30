import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import CopyContentButton from './CopyContentButton';

const MyModal = ({ recent, open, onClose }) => {
    const [css, setCss] = useState('');
    useEffect(() => {
        currentCss(recent);
    }, [recent]);
    const currentCss = (recent) => {
        const rules = recent.split(";").map(rule => rule.trim()).filter(rule => rule).map(rule => `\t${rule}`).join('\n');
        // console.log(rules);
        setCss(rules);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Current Css</DialogTitle>
            <DialogContent>
                <CopyContentButton containerId="copycss" />
                    <pre id="copycss"> {css}</pre>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyModal;
