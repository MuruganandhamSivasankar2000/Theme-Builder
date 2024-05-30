import React, { useEffect, useRef, useState } from 'react';
import DynamicInput from '../DynamicInput/DynamicInput';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Button, MenuItem, Select } from '@mui/material';
import SaveDailog from './SaveDailog';

import MyModal from './MyModal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MySnackbar from '../inputcomps/MySnackbar';
import GetVariation from './GetVariation';
import GetTreeVariation from '../LeftTree/GetTreeVariation';
import { useSelector } from 'react-redux';
import { store } from '../store/store';
import axios from 'axios';
import { Navbar } from '../navbar/Navbar';
import { Segment } from '@mui/icons-material';

const TestRenderingHtmlCss = ({ currentBrand, cmpname, cssRules, htmlContent }) => {
    const [currBrand, setCurrBrand] = useState('');
    const [renderedHtml, setRenderedHtml] = useState('');
    const [styles, setStyles] = useState({});
    const [openAccordion, setOpenAccordion] = useState(null);
    const [cmpref, setCmpref] = useState('');
    const [newCssRules, setNewCssRules] = useState({});
    const [recentStyle, setRecentStyle] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('Successfull');
    useEffect(() => {
        console.log(currentBrand);
        setCurrBrand(currentBrand);
        setStyles(cssRules);
        setRenderedHtml(htmlContent);
        setCmpref(cmpname);
    }, [htmlContent, cssRules, currentBrand]);
    const updateImageSrcs = () => {
        const prefix = "http://localhost:4506";
        const contentPath = "/content";
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src.startsWith(window.location.origin + contentPath)) {
                const newSrc = prefix + img.src.replace(window.location.origin, '');
                // console.log(`Updating image src: ${img.src} -> ${newSrc}`);
                img.src = newSrc;
            }
        });
    };
    useEffect(() => {
        updateImageSrcs();
        const observer = new MutationObserver(() => {
            updateImageSrcs();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, []);

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
    const [classCombinations, setclassCombinations] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [foundedCmp, setFoundedCmp] = useState([]);
    const [foundedHtml, setFoundedHtml] = useState('');
    const [sendingCmp, setSendingCmp] = useState([]);
    const [sendingHtml, setSendingHtml] = useState("");
    useEffect(() => {
        if (renderedHtml) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(renderedHtml, 'text/html');
            const targetElements = doc.querySelectorAll('.aem-GridColumn');
            // console.log(targetElements)
            // const classNames = targetElement.getAttribute('class').split(' ');

            const allClassNames = Array.from(targetElements).map((element) => {
                const classNames = element.getAttribute('class').split(' ');
                return classNames.map((name) => name.trim());
            });
            setclassCombinations(allClassNames)
            // console.log(allClassNames);
        }

    }, [renderedHtml]);
    const [showButton, setShowButton] = useState(false);
    const [uniqueClasses, setUniqueClasses] = useState([]);
    const [combinedClasses, setCombinedClasses] = useState([]);
    const hoverHTMLGetting = (event) => {
        const combinedArray = classCombinations.map((subArray) => subArray.join(' '));
        // console.log(combinedArray);
        const filteredArray = classCombinations.map((subArray) =>
            subArray.filter(word => !word.includes("aem-GridColumn") && !word.includes("aem-GridColumn--default--12") && !word.includes("container") && !word.includes("responsivegrid"))
        );
        const combined = filteredArray.flat();
        // console.log(filteredArray);
        // console.log(combined);
        setCombinedClasses(combined);
        // const targetClass = combined.map(classNames => event.target.closest(`.${classNames}`)).find(el => el);
        const capturedClasses = [];
        const targetClass = combined.map(classNames => {
            const element = event.target.closest(`.${classNames}`);
            if (element) {
                element.classList.add('my-hover-style');
                capturedClasses.push(classNames);
                setFoundedCmp(capturedClasses);

                return element;
            }
        }).find(el => el);

        if (targetClass) {
            const elementString = targetClass.outerHTML;
            // console.log(elementString)
            setFoundedHtml(elementString);
            const getAllUniqueClasses = () => {
                const allElements = targetClass.querySelectorAll("*");
                const classSet = new Set();
                allElements.forEach(descendant => {
                    descendant.classList.forEach(className => {
                        classSet.add(className);
                    })
                });
                return Array.from(classSet);
            }
            const classes = getAllUniqueClasses();
            setUniqueClasses(classes);
            setShowButton(true);
        } else {
            console.log("out");
            setShowButton(false);
        }
    }

    //button to get all the class name from hovered component
    const [cmpclasses, setCmpclasses] = useState([]);
    const [cmpStyles, setCmpStyles] = useState({});



    const handleButtonClick = () => {
        // fetchCmpVar();
        setSendingCmp(foundedCmp);
        // console.log(sendingCmp)
        const parser = new DOMParser();
        const doc = parser.parseFromString(foundedHtml, 'text/html');
        const elementsWithClassNames = doc.querySelectorAll('[class]');
        const classNamesArray = Array.from(elementsWithClassNames).reduce((acc, el) => {
            const classNames = el.getAttribute('class').split(' ');
            return [...acc, ...classNames];
        }, []);
        const classNamesToExclude = ["aem-GridColumn", 'container', "aem-GridColumn--default--12", "aem-GridColumn--default--none", "aem-GridColumn--offset--default--0"];

        const filteredClassNamesArray = classNamesArray.filter((className) => {
            return !classNamesToExclude.includes(className);
        });
        setCmpclasses(filteredClassNamesArray);
        console.log(filteredClassNamesArray);
        const matchingRules = {};
        for (const [selector, cssProperties] of Object.entries(styles)) {
            const selectorClasses = selector.split(' ').map(cls => cls.replace('.', ''));
            const isMatch = selectorClasses.every(cls => classNamesArray.includes(cls));
            if (isMatch) {
                matchingRules[selector] = cssProperties;
            }
        }
        // console.log(matchingRules);
        setCmpStyles(matchingRules);

    }


    const cmpvar = async (value) => {

    }

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
        // handleComponentVersionSubmit();
        // cmpvar(value);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const resetstyles = () => {
        setStyles(cssRules);
    }
    const url = "http://localhost:4506/bin/writecss?cmpname=" + cmpref + "&cmpvar=" + selectedDropdown;
    const [selectedStyles, setSelectedStyles] = useState([]);

    const [styleGroupLabel, setStyleGroupLabel] = useState('');
    const [styleLabel, setStyleLabel] = useState('');
    const [classNames, setClassNames] = useState({});
    const handleSelectedVariation = (variant, styleGrouplabel, stylelabel) => {
        console.log(variant, styleGrouplabel, stylelabel);
        setStyleGroupLabel(styleGrouplabel);
        setStyleLabel(stylelabel);
        const cssObj = {};
        variant.forEach((item, index) => {
            cssObj[index] = item;
        });
        console.log(cssObj);
        setClassNames(cssObj);
        const cleanedNames = sendingCmp.filter((style) => /^[a-zA-Z0-9]+$/.test(style));
        let searchCmp = `.${cleanedNames.join('.')}`;
        const targetElement = document.querySelector(searchCmp);
        if (targetElement) {
            selectedStyles.forEach((style) => {
                targetElement.classList.remove(style);
            });
            variant.forEach((style) => {
                targetElement.classList.add(style);
            });
            setSelectedStyles(variant);
            // console.log(targetElement);
        } else {
            console.warn(`Element with selector ${searchCmp} not found.`);
        }
    };

    const [currentVarStyle, setCurrentVarStyle] = useState({});
    useEffect(() => {
        const styleMatching = {};
        for (const [selector, cssProperties] of Object.entries(styles)) {
            const match = selectedStyles.find(value => selector.includes(value));
            if (match) {
                styleMatching[selector] = cssProperties;
            }
        }
        setCurrentVarStyle(styleMatching);
        // console.log(styleMatching);
    }, [selectedStyles]);
    // console.log(currentVarStyle);
    //currentVarStyle is object 
    const [currentVarString, setCurrentVarString] = useState('');
    const [currentCmpString, setCurrentCmpString] = useState('');

    const handleInputCMpChange = (className, property, newValue) => {
        setCmpStyles(prevStyles => ({
            ...prevStyles,
            [className]: {
                ...prevStyles[className],
                [property]: newValue
            }
        }));
    };
    useEffect(() => {
        let cssString = '';
        Object.entries(cmpStyles).forEach(([className, properties]) => {
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
        // setRecentStyle(cssString);
        // console.log(cssString);
        setCurrentCmpString(cssString);
    }, [cmpStyles, htmlContent]);
    // console.log(currentCmpString);

    const handleInputChangeCmp = (className, property, newValue) => {
        setCurrentVarStyle(prevStyles => ({
            ...prevStyles,
            [className]: {
                ...prevStyles[className],
                [property]: newValue
            }
        }));
    };
    const [nestedObject, setNestedObject] = useState({});
    const [styleSystem, setStyleSyatem] = useState({});

    useEffect(() => {
        let cssString = '';
        Object.entries(currentVarStyle).forEach(([className, properties]) => {
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
        setCurrentVarString(cssString);
        // console.log(cssString);
    }, [currentVarStyle, htmlContent]);
    // convert again css to JSON
    // data to save on DB for var will get as OBJECT in varCurrentOBJ
    const [varCurrentOBJ, setVarCurrentOBJ] = useState({});
    useEffect(() => {
        const newCssRules = {};
        currentVarString.split('}').forEach((rule) => {
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
                newCssRules[className] = propertiesObj;
            }
        });
        setVarCurrentOBJ(newCssRules);
        setStyleSyatem(newCssRules);
    }, [currentVarString]);
    // console.log(varCurrentOBJ); // component stylesystem 
    // data to save on DB for CMP will get as OBJECT in currentCmpObj
    const [currentCmpObj, setCurrentCmpObj] = useState({});
    useEffect(() => {
        const newCssRules = {};
        currentCmpString.split('}').forEach((rule) => {
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
                newCssRules[className] = propertiesObj;
            }
        });
        setCurrentCmpObj(newCssRules);
        setNestedObject(newCssRules);
    }, [currentCmpString]);

    // console.log(currentCmpObj); //component version object
    // console.log(pathClicked);
    const [projectName, setProjectName] = useState('');
    const [siteName, setSiteName] = useState('');
    const [componentName, setComponentName] = useState('');
    useEffect(() => {
        setProjectName('wknd');
        setSiteName(currentBrand);
        setComponentName(sendingCmp[0]);
        setValues(styleSystem);
    }, [foundedCmp, currentBrand, styleSystem]);
    const handleComponentVersionSubmit = async () => {
        let versionName = "currentversion";
        console.log(projectName, siteName, componentName, versionName, nestedObject);
        const data = {
            projectName,
            siteName,
            componentName,
            versionName,
            nestedObject
        };

        try {
            const response = await axios.post('http://localhost:8000/updateProject', data);
            alert("Sucessss")
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const [componentVersions, setComponentVersions] = useState({});


    
    const [values, setValues] = useState({});

    const handlestylesystemupdate = async (e) => {
        console.log(projectName, siteName, componentName, styleGroupLabel, styleLabel, classNames, values);

        const data = {
            projectName,
            siteName,
            componentName,
            styleGroupLabel,
            styleLabel,
            classNames,
            values
        };

        try {
            const response = await axios.post('http://localhost:8000/updateStyleSystem', data);

            console.log(response.data);
            alert("SS updated")
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const manipulicatedClassname = (className) => {
        // let manipulicatedClassname = className.replace(/\./g, '');
        // manipulicatedClassname = manipulicatedClassname.split(/__|-|__|--/).pop();
        return className.split(' ').map(segment => segment.replace(/\./g, '').split(/__|-|__|--/).pop().replace(/-/g, ' ')).join(' ');
    }

    return (
        <>
            <div className='cmp-custom-cnt'>
                <div className='live-html' onMouseOver={hoverHTMLGetting} onMouseOut={() => setShowButton(false)}>
                    <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                </div>
                <div className="cmp-list-all">
                    <Button id='getcss' onClick={handleButtonClick}>Get Css Style</Button>
                    {/* <Select defaultValue={30} label="Component Version From DB" style={{ height: '30px' }} onChange={handleDropdownComp}>
                        {componentVersions.length > 0 ? (
                            componentVersions.map((version) => (
                                <MenuItem key={version.versionName} value={version.versionName}>
                                    {version.versionName}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value={30}>No versions available</MenuItem>
                        )}
                    </Select> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="secondary" onClick={resetstyles}><RestartAltIcon /></Button>
                        <Button variant="outlined" onClick={handleOpenModal}><FileDownloadOutlinedIcon /></Button>
                        <Button variant="outlined" onClick={handleComponentVersionSubmit} >Save</Button>
                        <Button variant="outlined" onClick={handlestylesystemupdate} >Save ss</Button>

                        <Button target="_blank" href={url} variant="outlined">Apply</Button>
                    </div>
                    <MySnackbar
                        open={snackbarOpen}
                        setSnackbarOpen={setSnackbarOpen}
                        message={successMessage}
                    />
                    <MyModal recent={recentStyle} open={modalOpen} onClose={handleCloseModal} />
                    <SaveDailog open={dialogOpen} onClose={handleCloseDialog} onSave={handleSaveValue} />

                    {Object.entries(cmpStyles).map(([className, properties]) => {
                        const clsname = manipulicatedClassname(className);
                        return (
                            <Accordion key={className} className='acc-each' expanded={openAccordion === className} onChange={handleAccordionChange(className)}>
                                <AccordionSummary className='acc-summ' expandIcon={openAccordion === className ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}>
                                    <p style={{ fontSize: '13px' }}>{clsname}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {Object.entries(properties).map(([property, value]) => (
                                        <div key={property}>
                                            <label>{property}:</label>
                                            <DynamicInput
                                                propertyName={property}
                                                value={cmpStyles[className]?.[property] || value}
                                                onChange={(newValue) =>
                                                    handleInputCMpChange(className, property, newValue)
                                                }
                                            />
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                    <GetVariation handleSelectedVariation={handleSelectedVariation} sendingCmp={sendingCmp} />
                    {Object.entries(currentVarStyle).map(([className, properties]) => {
                        const clsname = manipulicatedClassname(className);
                        return (
                            <Accordion key={className} className='acc-each' expanded={openAccordion === className} onChange={handleAccordionChange(className)}>
                                <AccordionSummary className='acc-summ' expandIcon={openAccordion === className ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}>
                                    <p style={{ fontSize: '13px' }}>{clsname}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {Object.entries(properties).map(([property, value]) => (
                                        <div key={property}>
                                            <label>{property}:</label>
                                            <DynamicInput
                                                propertyName={property}
                                                value={currentVarStyle[className]?.[property] || value}
                                                onChange={(newValue) =>
                                                    handleInputChangeCmp(className, property, newValue)
                                                }
                                            />
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default TestRenderingHtmlCss;