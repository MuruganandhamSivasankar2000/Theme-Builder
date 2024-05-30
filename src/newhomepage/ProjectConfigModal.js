import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ProjectConfigModal = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState(localStorage.getItem('projectName') || '');
  const [projectUrl, setProjectUrl] = useState(localStorage.getItem('projectUrl') || '');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    localStorage.setItem('projectName', projectName);
    localStorage.setItem('projectUrl', projectUrl);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Configure Project Setup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Project Configuration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project URL"
            type="text"
            fullWidth
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectConfigModal;
