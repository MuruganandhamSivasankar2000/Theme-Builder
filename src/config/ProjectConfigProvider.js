import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context
const ProjectConfigContext = createContext();

// Create a Provider component
export const ProjectConfigProvider = ({ children }) => {
  const [projectName, setProjectName] = useState(localStorage.getItem('projectName') || '');
  const [projectUrl, setProjectUrl] = useState(localStorage.getItem('projectUrl') || '');
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('currentTheme') || '');

  useEffect(() => {
    localStorage.setItem('projectName', projectName);
  }, [projectName]);

  useEffect(() => {
    localStorage.setItem('projectUrl', projectUrl);
  }, [projectUrl]);
  useEffect(() => {
    localStorage.setItem('currentTheme', currentTheme);
  }, [currentTheme]);

  return (
    <ProjectConfigContext.Provider value={{ projectName, setProjectName, projectUrl, setProjectUrl,currentTheme,setCurrentTheme }}>
      {children}
    </ProjectConfigContext.Provider>
  );
};

// Create a custom hook to use the ProjectConfig context
export const useProjectConfig = () => {
  return useContext(ProjectConfigContext);
};
