import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';
function CopyContentButton({ containerId }) {
  const copyContent = () => {
    const container = document.getElementById(containerId);
    if (container) {
      const range = document.createRange();
      range.selectNode(container);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    }
  };

  return <Button variant='outlined' onClick={copyContent}><ContentCopyIcon />Copy to Clipboard</Button>;
}

export default CopyContentButton;
