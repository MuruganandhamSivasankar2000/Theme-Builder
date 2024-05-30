import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const ColorInputDialog = () => {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [siteOptions, setSiteOptions] = useState([]);
  const [siteName,setSiteName]=useState('');
  const [previewData, setPreviewData] = useState({
    primary: '#000',
    secondary: '#fafafa',
  });
  useEffect(() => {
    fetch('http://localhost:8000/bin/sitelist')
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, we haven't got JSON!");
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
  
  const [themeName, setThemeName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [themeType, setThemeType] = useState('general');

  const theme = createTheme({
    palette: {
      primary: {
        main: previewData.primary,
      },
      secondary: {
        main: previewData.secondary,
      },
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const themeData = {
      themeName,
      colors: {
        primary: previewData.primary,
        secondary: previewData.secondary,
        ...inputs
          .filter((input) => input.type === 'color')
          .reduce((acc, input) => {
            if (input.name) {
              acc[input.name] = input.value;
            }
            return acc;
          }, {}),
      },
      others: {
        ...inputs
          .filter((input) => input.type !== 'color')
          .reduce((acc, input) => {
            if (input.name) {
              acc[input.name] = input.value;
            }
            return acc;
          }, {}),
      },
    };

    try {
      await axios.post('http://localhost:8000/api/theme', {
        projectName,
        themeType,
        themeData,
      });
      console.log('Theme saved successfully');
    } catch (error) {
      console.error('Error saving theme:', error);
    }

    setOpen(false);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { type: 'text', value: '', name: '', key: Date.now() }]);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);

    if (newInputs[index].type === 'color') {
      const newPreviewData = { ...previewData };
      newPreviewData[newInputs[index].name] = event.target.value;
      setPreviewData(newPreviewData);
    }
  };

  const handleNameChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].name = event.target.value;
    setInputs(newInputs);
  };

  const handleTypeChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].type = event.target.value;
    setInputs(newInputs);
  };
  const handleSiteChange = (event) => {
    console.log(event);
    setSiteName(event);
  }
  const themeObject = {
    themeName,
    colors: {
      primary: previewData.primary,
      secondary: previewData.secondary,
      ...inputs
        .filter((input) => input.type === 'color')
        .reduce((acc, input) => {
          if (input.name) {
            acc[input.name] = input.value;
          }
          return acc;
        }, {}),
    },
    others: {
      ...inputs
        .filter((input) => input.type !== 'color')
        .reduce((acc, input) => {
          if (input.name) {
            acc[input.name] = input.value;
          }
          return acc;
        }, {}),
    },
  };
  const handleGeneralTheme = async () => {
    const data = {
      projectName,
      themeName,
      themeObject
    };

    try {
      const response = await axios.post('http://localhost:8000/updateGeneralTheme', data);
      console.log(data);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
    setOpen(false);

  };
  const handleSiteTheme = async () => {
    const data = {
      projectName,
      siteName,
      themeName,
      themeObject
    };

    try {
      const response = await axios.post('http://localhost:8000/updateSiteSpecificTheme', data);
      console.log(data);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
    setOpen(false);

  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Theme
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Customize Your Theme</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <TextField
                  label="Theme Name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                />
                <Select
                  select
                  SelectProps={{
                    native: true,
                  }}
                  value={themeType}
                  onChange={(e) => setThemeType(e.target.value)}
                >
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="siteSpecific">Choose for Sites</MenuItem>
                </Select>
                {
                  themeType === 'siteSpecific' && 
                  <Select
                      className="select-option"
                      onChange={(e) => handleSiteChange(e.target.value)}
                      defaultValue={30}

                    >
                      <MenuItem value={30} disabled selected>
                        Select Site
                      </MenuItem>
                      {siteOptions.map((site, index) => (
                        <MenuItem key={index} value={site}>
                          {site}
                        </MenuItem>
                      ))}
                    </Select>
                }
                <TextField
                  label="Primary Color"
                  type="color"
                  value={previewData.primary}
                  onChange={(e) =>
                    setPreviewData({ ...previewData, primary: e.target.value })
                  }
                />
                <TextField
                  label="Secondary Color"
                  type="color"
                  value={previewData.secondary}
                  onChange={(e) =>
                    setPreviewData({ ...previewData, secondary: e.target.value })
                  }
                />
                {inputs.map((input, index) => (
                  <Box key={input.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      placeholder="Property Name"
                      value={input.name}
                      onChange={(e) => handleNameChange(index, e)}
                    />
                    <TextField
                      select
                      SelectProps={{
                        native: true,
                      }}
                      value={input.type}
                      onChange={(e) => handleTypeChange(index, e)}
                    >
                      <option value="text">Text</option>
                      <option value="color">Color</option>
                      <option value="number">Number</option>
                    </TextField>
                    <TextField
                      type={input.type}
                      value={input.value}
                      onChange={(e) => handleInputChange(index, e)}
                      label={`Input ${index + 1}`}
                    />
                  </Box>
                ))}
                <IconButton onClick={handleAddInput}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ marginTop: 2 }}>
                <h3>Preview</h3>
                <Box
                  sx={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: previewData.primary,
                    color: previewData.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Preview Box
                </Box>
                {inputs.map((input, index) => (
                  <Box key={input.key} sx={{ marginTop: 1 }}>
                    <strong>{input.name}</strong>: {input.value}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleGeneralTheme}>General Save</Button>
          <Button onClick={handleSiteTheme}>Site theme Save</Button> */}
          {themeType === 'general' && (
        <Button onClick={handleGeneralTheme}>Save Theme</Button>
      )}

      {themeType === 'siteSpecific' && (
        <Button onClick={handleSiteTheme}>{siteName} Theme Save</Button>
      )}         
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ColorInputDialog;