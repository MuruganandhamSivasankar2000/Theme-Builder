
import React, { useEffect, useState } from 'react'

const TreeSelectComponent = () => {
    const [selectedPath, setSelectedPath] = useState('');

    useEffect(() => {
        const updateSelectedPath = () => {
            const storedPath = localStorage.getItem('selectedPath');
            console.log("Updated path :- ", storedPath);
            setSelectedPath(storedPath);
        }
        updateSelectedPath();
        window.addEventListener('storageChange', updateSelectedPath);
        return () => {
            window.removeEventListener('storageChange', updateSelectedPath);
        };


    }, []);

    return (
        <div>path :-  {selectedPath}</div>
    )
}

export default TreeSelectComponent
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
// import { TreeItem } from '@mui/x-tree-view/TreeItem';

// export default function BasicSimpleTreeView() {
//   return (
//     <Box sx={{ height: 220, flexGrow: 1, maxWidth: 400 }}>
//       <SimpleTreeView>
//         <TreeItem itemId="grid" label="Data Grid">
//           <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
//           <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
//           <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
//         </TreeItem>
//         <TreeItem itemId="pickers" label="Date and Time Pickers">
//           <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
//           <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
//         </TreeItem>
//       </SimpleTreeView>
//     </Box>
//   );
// }
