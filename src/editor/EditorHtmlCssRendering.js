import React, { useEffect, useState } from 'react';
import DynamicInput from '../DynamicInput/DynamicInput';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Button, MenuItem, Select } from '@mui/material';
import SaveDailog from '../finalqatest/SaveDailog';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase/index';
import MyModal from '../finalqatest/MyModal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MySnackbar from '../inputcomps/MySnackbar';

const EditorHtmlCssRendering = ({ cssRules, htmlContent }) => {
    const [renderedHtml, setRenderedHtml] = useState('');
    const [styles, setStyles] = useState({});
    const [openAccordion, setOpenAccordion] = useState(null);
    // const [cmpref, setCmpref] = useState('');
    const [newCssRules, setNewCssRules] = useState({});
    const [recentStyle, setRecentStyle] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('Successfull');
    useEffect(() => {
        setStyles(cssRules);
        setRenderedHtml(htmlContent);
        // setCmpref('hello');
    }, [htmlContent, cssRules]);

    const handleInputChange = (className, property, newValue) => {
        setStyles(prevStyles => ({
            ...prevStyles,
            [className]: {
                ...prevStyles[className],
                [property]: newValue
            }
        }));
    };
    useEffect(() => {
        let cssString = '';
        Object.entries(styles).forEach(([className, properties]) => {
            cssString += `${className} { `;
            Object.entries(properties).forEach(([property, value]) => {
                cssString += `${property}: ${value}; `;
            });
            cssString += '} ';
        });
        const styleTag = document.createElement('style');
        styleTag.innerHTML = cssString;
        document.head.appendChild(styleTag);
        setRenderedHtml(htmlContent);
        setRecentStyle(cssString);
        // console.log(recentStyle);
    }, [styles, htmlContent]);
    const [selectedDropdown, setSelectedDropdown] = useState('current');

    const handleAccordionChange = (className) => (event, isExpanded) => {
        setOpenAccordion(isExpanded ? className : null);
    };
    const cmpdatas = localStorage.getItem("allItems");
    const dataArray = JSON.parse(cmpdatas);

    // const fiteredObjects = Object.entries(dataArray)
    //     .filter(([key, value]) => {
    //         return key.includes(cmpref);
    //     }).map(([key, value]) => {
    //         return { key, value };
    //     })
    // const handleCmpVariation = (id) => {
    //     const selectedObject = fiteredObjects[id];
    //     if (id === 'current') {
    //         setStyles(cssRules);
    //         setSelectedDropdown('current');
    //     } else {
    //         setStyles(selectedObject.value);
    //         console.log(selectedObject);
    //         console.log(selectedObject.value);
    //         setSelectedDropdown(selectedObject.key);
    //     }
    // }
    // const parseCssStringToObject = (cssString) => {
    //     const newCssRulestoObj = {};
    //     cssString.split('}').forEach((rule) => {
    //         const [selector, properties] = rule.split('{');
    //         if (selector && properties) {
    //             const className = selector.trim();
    //             const propertiesArray = properties.split(';');
    //             const propertiesObj = {};
    //             propertiesArray.forEach((prop) => {
    //                 const [property, value] = prop.split(':');
    //                 if (property && value) {
    //                     propertiesObj[property.trim()] = value.trim();
    //                 }
    //             });
    //             newCssRulestoObj[className] = propertiesObj;
    //         }
    //     });
    //     setNewCssRules(newCssRulestoObj);
    //     console.log(newCssRules);
    // };
    const selectedSite = localStorage.getItem("selectedSite");
    const cmpvar = async (value) => {
        var storingname;
        storingname = selectedSite + "-"  + "-" + value;
        const newCssRulestoObj = {};
        recentStyle.split('}').forEach((rule) => {
            const [selector, properties] = rule.split('{');
            if (selector && properties) {
                const className = selector.trim();
                const propertiesArray = properties.split(';');
                const propertiesObj = {};
                propertiesArray.forEach((prop) => {
                    const [property, value] = prop.split(':');
                    if (property && value) {
                        propertiesObj[property.trim()] = value.trim();
                    }
                });
                newCssRulestoObj[className] = propertiesObj;
            }
        });
        console.log(newCssRulestoObj);
        // setDoc(doc(db, 'travel', storingname), newCssRulestoObj)
        //     .then(() => {
        //         console.log('New Variation for component is setted!');
        //         setSuccessMessage(storingname + ' Created successfully!');
        //         setSnackbarOpen(true);
        //     })
        //     .catch((error) => {
        //         console.error('Error writing document: ', error);
        //     });

    }
    // const handleDbvarchange = () => {
    //     const newCssRulestoObj = {};
    //     recentStyle.split('}').forEach((rule) => {
    //         const [selector, properties] = rule.split('{');
    //         if (selector && properties) {
    //             const className = selector.trim();
    //             const propertiesArray = properties.split(';');
    //             const propertiesObj = {};
    //             propertiesArray.forEach((prop) => {
    //                 const [property, value] = prop.split(':');
    //                 if (property && value) {
    //                     propertiesObj[property.trim()] = value.trim();
    //                 }
    //             });
    //             newCssRulestoObj[className] = propertiesObj;
    //         }
    //     });
    //     console.log(newCssRulestoObj);
    //     setDoc(doc(db, 'travel', selectedDropdown), newCssRulestoObj)
    //         .then(() => {
    //             setSuccessMessage(' Updated successfully!');
    //             setSnackbarOpen(true);
    //             console.log('New Variation for component is setted!');


    //         })
    //         .catch((error) => {
    //             console.error('Error writing document: ', error);
    //         });

    // }
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    const handleSaveValue = (value) => {
        cmpvar(value);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const resetstyles = () => {
        setStyles(cssRules);
    }
    // const url = "http://localhost:4506/bin/writecss?cmpname=" + cmpref + "&cmpvar=" + selectedDropdown;
    // console.log(url);
    return (
        <>
            <div className='cmp-custom-cnt'>
                <div className='cmp-livedisplay-d'>
                    <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                </div>
                <div className="custom-inputstyle-d">
                    {/* <Select defaultValue={"current"} onChange={(e) => handleCmpVariation(e.target.value)}>
                        <MenuItem value={"current"}>Current Styles</MenuItem>
                        {fiteredObjects.map((object, index) => (
                            <MenuItem key={index} value={index}>
                                {object.key}
                            </MenuItem>
                        ))}
                    </Select> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="secondary" onClick={resetstyles}><RestartAltIcon /></Button>
                        <Button variant="outlined" onClick={handleOpenModal}><FileDownloadOutlinedIcon /></Button>


                        <Button variant="outlined" onClick={handleOpenDialog}>Save</Button>

                        {/* <Button variant="contained" onClick={handleDbvarchange}>Save</Button> */}

                        {/* <Button href={url} variant="outlined">Apply</Button> */}
                    </div>
                    <MySnackbar
                        open={snackbarOpen}
                        setSnackbarOpen={setSnackbarOpen}
                        message={successMessage}
                    />
                    <MyModal recent={recentStyle} open={modalOpen} onClose={handleCloseModal} />
                    <SaveDailog open={dialogOpen} onClose={handleCloseDialog} onSave={handleSaveValue} />
                    {Object.entries(cssRules).map(([className, properties]) => (
                        <Accordion key={className} className='acc-each' expanded={openAccordion === className} onChange={handleAccordionChange(className)}>
                            <AccordionSummary className='acc-summ' expandIcon={openAccordion === className ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}>
                                <p>{className}</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                {Object.entries(properties).map(([property, value]) => (
                                    <div key={property}>
                                        <label>{property}:</label>
                                        <DynamicInput
                                            propertyName={property}
                                            value={styles[className]?.[property] || value}
                                            onChange={(newValue) =>
                                                handleInputChange(className, property, newValue)
                                            }
                                        />
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EditorHtmlCssRendering;