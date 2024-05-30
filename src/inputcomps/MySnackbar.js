import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MySnackbar = ({ open,  message ,setSnackbarOpen}) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
      <MuiAlert elevation={6} severity="success">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MySnackbar;
