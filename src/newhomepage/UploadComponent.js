import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent = () => {
  const [projectName, setProjectName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [componentName, setComponentName] = useState('');
  const [componentVersion, setComponentVersion] = useState({});
  const [styleSystem, setStyleSystem] = useState({});

  const handleComponentVersionSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/componentVersion', {
        projectName,
        siteName,
        componentName,
        componentVersion: { "cmp1.0": componentVersion },
      });
      alert('Component version saved successfully');
    } catch (error) {
      console.error('Error saving component version:', error);
    }
  };

  const handleStyleSystemSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/styleSystem', {
        projectName,
        siteName,
        componentName,
        styleSystem: { styleGroupName: styleSystem.groupName, styleLabel: styleSystem.labels },
      });
      alert('Style system saved successfully');
    } catch (error) {
      console.error('Error saving style system:', error);
    }
  };

  return (
    <div>
      <h2>Upload Component Data</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Site Name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Component Name"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
      />
      <textarea
        placeholder="Component Version (JSON)"
        value={componentVersion}
        onChange={(e) => setComponentVersion(JSON.parse(e.target.value))}
      />
      <button onClick={handleComponentVersionSubmit}>Save Component Version</button>
      <br />
      <textarea
        placeholder="Style System (JSON)"
        value={styleSystem}
        onChange={(e) => setStyleSystem(JSON.parse(e.target.value))}
      />
      <button onClick={handleStyleSystemSubmit}>Save Style System</button>
    </div>
  );
};

export default UploadComponent;
