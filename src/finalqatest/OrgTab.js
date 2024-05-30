import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';
import TakeHtml from './TakeHtml';
// import { auth, db, dbb } from '';
// import { collection, doc, getDocs } from 'firebase/firestore';

const OrgTab = () => {
  const [componentData, setComponentData] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [cmpdata, setCmpdata] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/bin/cmphtmljson?pagepath=/content/Travel-Site/branda/en/library');
        const data = await response.json();
        console.log(data);
        setComponentData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // const fetchproj = async () => {
    //   const themesRef = collection(db, "wknd");
    //   try {
    //     const snapshot = await getDocs(themesRef);
    //     const arr = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //     setCmpdata(arr);
    //     localStorage.setItem("cmpdatas", JSON.stringify(cmpdata));
    //   } catch (err) {
    //     console.error("Error fetching data:", err);
    //   }
    //   setLoad(false);
    // }
    // fetchproj();

  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <div>
        <Tabs value={selectedTab} onChange={handleChange}>
          {Object.keys(componentData).map((key, index) => (
            <Tab key={index} label={key} />
          ))}
        </Tabs>
        {Object.values(componentData).map((value, index) => (
          <TabPanel key={index} value={selectedTab} index={index}>
            {/* <Typography variant="body1">Path: {value.cmppath}</Typography> */}
            <TakeHtml cmpname={value.cmpname} cmpHtml={value.cmphtml} />
            {/* {console.log(value.cmphtml)} */}
          </TabPanel>
        ))}
      </div>
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

export default OrgTab;
