import React, { useEffect, useState } from 'react'
import TestCsstoObj from './TestCsstoObj';
import TestVariation from '../LeftTree/TestVariation';
import GetTreeVariation from '../LeftTree/GetTreeVariation';

const TakeHtml = ({ cmpname }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [cmpnameref, setCmpnameref] = useState('');
    const [currentPath, setCurrentPath] = useState('');
    const [currentBrand, setCurrentBrand] = useState('');
    // const [currentPath, setCurrentPath] = useState('');
    const [selectedPath, setSelectedPath] = useState('');
    const [sendingBrand, setSendingBrand] = useState('');
    useEffect(() => {
        
        const fetchData = async () => {
            console.log("current path " + currentPath);
            console.log("currrent brand " + sendingBrand);
            if (currentPath) {
                try {
                    var path;
                    path = "/content/wknd/branda/en/library";
                    const response = await fetch(`http://localhost:8000/bin/libhtml?cmppath=${currentPath}/jcr:content`);
                    const data = await response.text();
                    setHtmlContent(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchData();
        setSendingBrand(currentBrand);
    }, [cmpname, currentPath, selectedPath, currentBrand,sendingBrand]);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const elementsWithClassNames = doc.querySelectorAll('[class]');

    const classNamesArray = Array.from(elementsWithClassNames).reduce((acc, el) => {
        const classNames = el.getAttribute('class').split(' ');
        return [...acc, ...classNames];
    }, []);
    // console.log(classNamesArray);
    const handlefromHtmlPath = (path) => {
        setCurrentPath(path);
    }
    const handlefromHtmlBrand = (brand) => {
        setCurrentBrand(brand);
    }
    return (
        <div className='cmp-custom-cnt' style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='tree-change'>
                <GetTreeVariation handlefromHtmlBrand={handlefromHtmlBrand} handlefromHtmlPath={handlefromHtmlPath} />
            </div>
            <div className='html-render'>
                <TestCsstoObj currentBrand={sendingBrand} cmpname={cmpnameref} arr={classNamesArray} htmlContent={htmlContent} />
            </div>
        </div>
    )
}

export default TakeHtml;