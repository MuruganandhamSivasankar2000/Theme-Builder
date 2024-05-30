// src/components/ProjectForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [componentName, setComponentName] = useState('');
  const [variationKey, setVariationKey] = useState('');

  // Static JSON data for the variation content
  const variationContents = {
    "abc":{ "backgroundColor": 'red', "fontSize": '14px', "margin": '10px' },
   "bcd": { "backgroundColor": 'blue', "fontSize": '16px', "margin": '20px' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/projects', {
        projectName,
        siteName,
        componentName,
        variationKey,
        variationContents,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Site Name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Component Name"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Variation Key"
        value={variationKey}
        onChange={(e) => setVariationKey(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectForm;
