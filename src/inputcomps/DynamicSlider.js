import React from 'react'
import Slider from '@mui/material/Slider';
import { InputLabel  } from '@mui/material'

const DynamicSlider = ({selectedValue,onChange,min,max,label}) => {
  return (
    <div>
       <InputLabel id="select-label">{label}</InputLabel>
       <Slider 
         min={min}
         max={max}
       value={selectedValue}
       onChange={onChange}
       aria-label="dynamic-slider" valueLabelDisplay="auto" />
    </div>
  )
}

export default DynamicSlider