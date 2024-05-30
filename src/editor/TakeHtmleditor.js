import React, { useEffect, useState } from 'react'
import CssToObjForEditor from './CssToObjForEditor';

const TakeHtmleditor = ({html,css}) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [cmpnameref,setCmpnameref]=useState('');
    const [cssContent,setCssContent]=useState('');

    useEffect(() => {
        setHtmlContent(html);
        setCssContent(css)
     }, [html,css]);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const elementsWithClassNames = doc.querySelectorAll('[class]');

    const classNamesArray = Array.from(elementsWithClassNames).reduce((acc, el) => {
        const classNames = el.getAttribute('class').split(' ');
        return [...acc, ...classNames];
    }, []);
    console.log(classNamesArray);
    return (
        <div>
            <CssToObjForEditor arr={classNamesArray} cssContent={cssContent} htmlContent={htmlContent} />
         </div>
    )
}

export default TakeHtmleditor;