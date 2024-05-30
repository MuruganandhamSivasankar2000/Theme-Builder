import React from 'react'
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
const ResetButton = ({onClick}) => {
  return (
    <div>
        <Button color="secondary"  variant='contained'  onClick={onClick}>
          <RestartAltIcon />
        </Button>
    </div>
  )
}

export default ResetButton