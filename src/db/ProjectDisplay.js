// src/components/ProjectDisplay.js
import React, { useState } from 'react';
import axios from 'axios';

const ProjectDisplay = () => {
  const [projectName, setProjectName] = useState('');
  const [projectData, setProjectData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/projects/${projectName}`);
      setProjectData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Project</button>
      {projectData && (
        <div>
          <h3>{projectData.projectName}</h3>
          {projectData.sites.map((site, index) => (
            <div key={index}>
              <h4>{site.siteName}</h4>
              {site.components.map((component, idx) => (
                <div key={idx}>
                  <p>{`Component: ${component.name}`}</p>
                  {component.variations.map((variation, vidx) => (
                    <div key={vidx}>
                      <p>{`Variation Key: ${variation.key}`}</p>
                      <pre>{JSON.stringify(variation.currcmp, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDisplay;
