import React, { useEffect, useState } from 'react';
import TestRenderingHtmlCss from './TestRenderingHtmlcss';
import { Box } from '@mui/material';
import GetTreeVariation from '../LeftTree/GetTreeVariation';

const MyTestToSearch = ({ currentBrand, cmpname, cssRulesArray, selectorsToSearch, htmlContent }) => {
 
 const [currentBrandSending, setCurrentBrandSending] = useState('');
  useEffect(() => {
    console.log(currentBrand);
    setCurrentBrandSending(currentBrand);
  }, [currentBrand]);
  
  // console.log(cssRulesArray);
  // console.log(selectorsToSearch);
  // const matchingRules = {};
  // for (const [cssRules, cssProperties] of Object.entries(cssRulesArray)) {
  //   const match = selectorsToSearch.find(value => cssRules.includes(value));
  //   if (match) {
  //     matchingRules[cssRules] = cssProperties;
  //   }
  // }

  return (
    <div>
      {/* <Box className='cmp-box-borderfull' component="section" sx={{ p: 2, border: '1px dashed skyblue' }}> */}
        <TestRenderingHtmlCss currentBrand={currentBrandSending} cmpname={cmpname} cssRules={cssRulesArray} htmlContent={htmlContent} />
      {/* </Box> */}
    </div>
  );
};

export default MyTestToSearch;
