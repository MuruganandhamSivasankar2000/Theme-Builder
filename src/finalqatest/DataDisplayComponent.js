import React, { useEffect, useState } from 'react';

// Component to display the keys and their data
const DataDisplayComponent = ({ data }) => {
  return (
    <div>
      <h3>Keys and Data from Selected Path:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataDisplayComponent