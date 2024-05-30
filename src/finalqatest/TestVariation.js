import { useEffect, useState } from "react";
import DataDisplayComponent from "./DataDisplayComponent";
import MatchedDataDisplay from "./MatchedDataDisplay";
import DisplayComponent from "./DisplayComponent";

const TestVariation = ({  jsonData, keysArray }) => {
    const [data, setData] = useState({});
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedPath, setSelectedPath] = useState('');
    const [keysToMatch, setKeysToMatch] = useState([]);

    const [matchedData, setMatchedData] = useState(null);

    const [styleGroupArr, setStyleGroupArr] = useState({});
    useEffect(() => {
        setData(jsonData);
        setKeysToMatch(keysArray);
    }, [jsonData]);

    const getData = (brand, path) => {
        if (data[brand] && data[brand][path]) {
            return data[brand][path];
        } else {
            return null;
        }
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedPath(''); // Reset path when brand changes
        setMatchedData(null); // Reset matched data when brand changes
    };

    const handlePathChange = (e) => {
        setSelectedPath(e.target.value);
        setMatchedData(null); // Reset matched data when path changes
        matchKeysInPath();  
    };

    const matchKeysInPath = () => {
        const pathData = getData(selectedBrand, selectedPath);

        if (pathData) {
            setStyleGroupArr(pathData);
            console.log(pathData);
            const styles = {};
            // const se = ["teaser"];
            console.log(keysToMatch);
            for (const key in pathData) {
                if (pathData.hasOwnProperty(key)) {
                    keysToMatch.forEach((key) => {
                    if (pathData[key]) {
                        styles[key] = pathData[key];
                    }
                });
                }
            }
            setMatchedData(styles);
            console.log(styles);
        }
    };

    return (
        <div>
            <select onChange={handleBrandChange} value={selectedBrand}>
                <option value="">Select Brand</option>
                {Object.keys(data).map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                ))}
            </select>

            {selectedBrand && (
                <select onChange={handlePathChange} value={selectedPath}>
                    <option value="">Select Path</option>
                    {Object.keys(data[selectedBrand] || {}).map((path, index) => (
                        <option key={index} value={path}>{path}</option>
                    ))}
                </select>
            )}

            {/* <DisplayComponent handleSelectedVariation={handleSelectedVariation} keysArray={keysArray} styleGroups={styleGroupArr} /> */}
        </div>
    );
};
export default TestVariation;






// const TestVariation = ({ jsonData }) => {
//   const [data, setData] = useState({});
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const [selectedPath, setSelectedPath] = useState('');

//   useEffect(() => {
//     // Simulate fetching JSON data dynamically
//     setData(jsonData);
//   }, [jsonData]);

//   const getData = (brand, path) => {
//     if (data[brand] && data[brand][path]) {
//         // console.log(data[brand][path]);
//       return data[brand][path];
//     } else {
//       return null;
//     }
//   };
//   const handleBrandChange = (e) => {
//     setSelectedBrand(e.target.value);
//     setSelectedPath(''); // Reset path when brand changes
//   };

//   const handlePathChange = (e) => {
//     setSelectedPath(e.target.value);
//   };

//   return (
//     <div>
//       <select onChange={handleBrandChange} value={selectedBrand}>
//         <option value="">Select Brand</option>
//         {Object.keys(data).map((brand) => (
//           <option key={brand} value={brand}>{brand}</option>
//         ))}
//       </select>

//       {selectedBrand && (
//         <select onChange={handlePathChange} value={selectedPath}>
//           <option value="">Select Path</option>
//           {Object.keys(data[selectedBrand] || {}).map((path, index) => (
//             <option key={index} value={path}>{path}</option>
//           ))}
//         </select>
//       )}
//       {/* <DisplayComponent handleSelectedVariation={handleSelectedVariation} styleGroups={styleGroups} keysArray={cmparr}/> */}

//       {selectedBrand && selectedPath && (
//         <div>
//           <h3>Data for {selectedBrand} at {selectedPath}:</h3>
//           <pre>{JSON.stringify(getData(selectedBrand, selectedPath), null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestVariation;
