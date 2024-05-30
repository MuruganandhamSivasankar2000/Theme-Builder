import React, { useEffect, useState } from 'react';
import MyTestToSearch from './MyTestToSearch';

const TestCsstoObj = ({currentBrand, cmpname, arr, htmlContent }) => {
    const [cssArr, setCssArr] = useState([]);
    const [cssSnippet, setCssSnippet] = useState('');
    const [cssRules, setCssRules] = useState({});
const[currentBrandSending,setCurrentBrandSetting]=useState('');
    useEffect(() => {
        console.log(currentBrand);
        setCurrentBrandSetting(currentBrand);
        setCssArr(arr);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/bin/cssitr');
                const data = await response.text();
                setCssSnippet(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [arr,currentBrand]);

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

    return (
        <div>
            <MyTestToSearch  currentBrand={currentBrandSending} cmpname={cmpname} cssRulesArray={cssRules} selectorsToSearch={cssArr} htmlContent={htmlContent} />
        </div>
    );
};

export default TestCsstoObj;











