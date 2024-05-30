import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Key } from '@mui/icons-material';

const TestVariation = ({handlefromHtmlBrand, handlefromHtmlPath, jsonData }) => {
  const [data, setData] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    setData(jsonData);
    localStorage.setItem('jsonData', JSON.stringify(jsonData));
  }, [jsonData]);

  const handleBrandChange = (brand) => {
    console.log("Brand changed to:", brand);
    setSelectedBrand(brand);
    setSelectedPath('');
  };

  const handlePathChange = (path) => {
    console.log("Path changed to:", path);
    localStorage.setItem('selectedPath', path);
    setSelectedPath(path);
    const pathData = getData(selectedBrand, path);
    if (pathData) {
      localStorage.setItem('matchingPathData', JSON.stringify(pathData));
    }
  };

  const handleClick = (key, level) => {
    console.log("Clicked key:", key, "Level:", level);
    if (level === 1) {
      localStorage.setItem("selectedBrand", key);
      handlefromHtmlBrand(key)
      handleBrandChange(key);
    } else if (level === 2) {
      handlePathChange(key);
      handlefromHtmlPath(key);
    }
  };
  const getData = (brand, path) => {
    if (data[brand] && data[brand][path]) {
      return data[brand][path];
    } else {
      return null;
    }
  };

  const renderTreeItems = (data, parentId = '', level = 1) => {
    return Object.keys(data).map((key) => {
      const nodeId = parentId ? `${parentId}-${key}` : key;
      const hasChildren = typeof data[key] === 'object' && data[key] !== null;
      const isClickable = level <= 2;

      return (
        <TreeItem
          key={nodeId}
          itemId={nodeId}
          label={key}
          onClick={() => isClickable && handleClick(key, level)}
        >
          {hasChildren ? renderTreeItems(data[key], nodeId, level + 1) : null}
        </TreeItem>
      );
    });
  };

  return (
    <Box sx={{ height: 220, flexGrow: 1, maxWidth: 400 }}>
      <SimpleTreeView>
        {renderTreeItems(data)}
      </SimpleTreeView>
    </Box>
  );
};

export default TestVariation;