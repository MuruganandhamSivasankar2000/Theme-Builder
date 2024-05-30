import React from 'react';
import EditorHtmlCssRendering from './EditorHtmlCssRendering';
import { Box } from '@mui/material';

const EditorCssToSearch = ({ cssRulesArray, selectorsToSearch, htmlContent }) => {
 
  const matchingRules = {};
  for (const [cssRules, cssProperties] of Object.entries(cssRulesArray)) {
    const match = selectorsToSearch.find(value => cssRules.includes(value));
    if (match) {
      matchingRules[cssRules] = cssProperties;
    }
  }

  return (
    <div>
      <Box className='cmp-box-borderfull' component="section" sx={{ p: 2, border: '1px dashed skyblue' }}>
        <EditorHtmlCssRendering cssRules={matchingRules} htmlContent={htmlContent} />
      </Box>
    </div>
  );
};

export default EditorCssToSearch;
