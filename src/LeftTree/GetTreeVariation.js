import React, { useEffect, useState } from 'react';
import TestVariation from './TestVariation';

const GetTreeVariation = ({handlefromHtmlBrand, handlefromHtmlPath,sendingCmp }) => {
  const [data, setData] = useState({});
  const [cmparr, setCmparr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/bin/styleinfo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // localStorage.setItem("matchingPathData",JSON.stringify(data));
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setCmparr(sendingCmp);
  }, [sendingCmp]);

  return (
    <div>
      <TestVariation handlefromHtmlBrand={handlefromHtmlBrand} handlefromHtmlPath={handlefromHtmlPath} keysArray={cmparr} jsonData={data} />
    </div>
  );
};

export default GetTreeVariation;
