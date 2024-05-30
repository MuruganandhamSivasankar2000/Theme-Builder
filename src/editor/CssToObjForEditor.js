import React, { useEffect, useState } from 'react';
import EditorCssToSearch from './EditorCssToSearch';
  
const CssToObjForEditor = ({cssContent,arr,htmlContent}) => {
    const [cssArr, setCssArr] = useState([]);
    const [cssSnippet, setCssSnippet] = useState('');
    const [cssRules, setCssRules] = useState({});
 
    useEffect(() => {
        setCssArr(arr);
        setCssSnippet(cssContent);
        // setCssSnippet();
        // window.addEventListener('storage', (event) => {
        //     if (event.key === 'editor-css') {
        //       // Update state with the new value
        //       setCssSnippet(event.newValue);
        //      console.log(cssSnippet);
        //     }
        //   });
        // setCssArr(arr);
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch('http://localhost:8000/bin/cssitr');
        //         const data = await response.text();
        //         setCssSnippet(data);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // };
        // fetchData();
        // console.log(cssArr);
    }, [cssContent,arr,htmlContent]);
console.log(cssSnippet);
    useEffect(() => {
        const newCssRules = {};
        cssSnippet.split('}').forEach((rule) => {
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

        setCssRules(newCssRules);
    }, [cssSnippet]);
console.log(cssRules)
    return (
        <div>
             {
                console.log(cssArr)
            }
            {
                console.log(cssRules)
            }
            <EditorCssToSearch  cssRulesArray={cssRules} selectorsToSearch={cssArr} htmlContent={htmlContent} />
           
        </div>
    );
};

export default CssToObjForEditor;













 