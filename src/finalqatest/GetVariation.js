import React, { useEffect, useState } from 'react';
import DisplayComponent from './DisplayComponent';
import TestVariation from './TestVariation';

const GetVariation = ({ sendingCmp, handleSelectedVariation }) => {
  const [styleGroups, setStyleGroups] = useState({});
  const [data, setData] = useState({});
  const [cmparr, setCmparr] = useState([]);
  useEffect(() => {
    console.log(sendingCmp)
    const pathinside=localStorage.getItem('matchingPathData');
    setData(JSON.parse(pathinside));
    setCmparr(sendingCmp);
    console.log(data);
  }, [sendingCmp]);

  return (
    <div>
      {/* <TestVariation keysArray={cmparr} jsonData={data} /> */}
      <DisplayComponent handleSelectedVariation={handleSelectedVariation} styleGroups={data} keysArray={cmparr}/>
    </div>
  );
};

export default GetVariation;
