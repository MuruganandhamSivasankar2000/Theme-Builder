// src/App.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import MyDailog from './MyDailog';

function HomeApp() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClickOpen}>
        Create A Theme
      </Button>
      <MyDailog open={open} handleClose={handleClose} />
    </div>
  );
}

export default HomeApp;
