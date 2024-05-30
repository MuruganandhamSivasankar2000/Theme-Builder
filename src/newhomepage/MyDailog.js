// src/components/MyDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from '@mui/material';
// import axios from 'axios';

const MyDialog = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    primaryColor: '#000000',
    secondaryColor: '#fafafa',
    tertiaryColor: '#5b5959',
    fourthColor: '#fff000',
    fontSize: 16,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // await axios.post('/api/save', formData);
      console.log(formData);
      handleClose();
    } catch (error) {
      console.error('Error saving data', error);
    }
  };
  

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{textAlign:'center',backgroundColor:'#fafafa'}}>Customize Your Theme</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              margin="dense"
              name="primaryColor"
              label="Primary Color"
              type="color"
              fullWidth
              variant="standard"
              value={formData.primaryColor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="secondaryColor"
              label="Secondary Color"
              type="color"
              fullWidth
              variant="standard"
              value={formData.secondaryColor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="tertiaryColor"
              label="Tertiary Color"
              type="color"
              fullWidth
              variant="standard"
              value={formData.tertiaryColor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="fourthColor"
              label="Fourth Color"
              type="color"
              fullWidth
              variant="standard"
              value={formData.fourthColor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="fontSize"
              label="Font Size"
              type="number"
              fullWidth
              variant="standard"
              value={formData.fontSize}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <div style={{color:formData.primaryColor,backgroundColor:formData.secondaryColor,height:'50vh', padding:'10px',border:'1px solid '}} lass="main-container">
              <div class="blur-circle1">
              </div>
              <div class="blur-circle2">
              </div>
              <div style={{fontSize:formData.fontSize+'px'}} class="landing-page">
                <header>
                  <div style={{display:'flex',alignItems:'center',gap:'20px',paddingLeft:'40px'}} class="container">
                    {/* <a href="#" class="logo">Your <b>Website</b></a> */}
                    <h2>Logo</h2>
                    <ul  style={{display:'flex',gap:'17px',listStyle: 'none'}} class="links">
                      <li style={{textDecoration:'none'}}>Home</li>
                      <li>About</li>
                      <li>Work</li>
                      <li>About</li>
                    </ul>
                  </div>
                </header>
                <div>
                  <div >
                    <div >
                      <h1>Looking For Inspiration</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihil</p>
                      <button className='btnstatic' style={{color:formData.primaryColor,backgroundColor:formData.fourthColor,border:'2px solid',padding:'10px',borderColor:formData.tertiaryColor }}>Click Here !</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
