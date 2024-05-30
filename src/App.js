import './App.css';
import TreeSelectComponent from './LeftTree/TreeSelectComponent';
import BasicSimpleTreeView from './LeftTree/TreeSelectComponent';
import ProjectDisplay from './db/ProjectDisplay';
import ProjectForm from './db/ProjectForm';
import TakeHtml from './finalqatest/TakeHtml';
import Login from './login/Login';
import Register from './login/Register';
import { Navbar } from './navbar/Navbar';
import ColorInputDialog from './newhomepage/ColorInputDialog';
import ThemeSelector from './newhomepage/ThemeSelector';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Library from './pages/Library';
import HtmlEditor from './editor/HtmlEditor';
import SiteDropdown from './newhomepage/SiteDropdown';
import ProjectConfigModal from './newhomepage/ProjectConfigModal';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={
                <div style={{display:'flex',flexDirection:'row'}}>
                  <div style={{display:'flex',flexDirection:'column',flex:'0.5',gap:'20px'}}>
                    <div className='txt-home'>
                      <div className='font-title'>
                        Design Your Perfect Theme
                        <span>
                          {' '}   with AEM Theme Builder tool
                        </span>
                      </div>
                      <div className='choosetheme'>
                        Choose Pre-defined or Create Elite AEM Themes
                      </div>
                    </div>
                    {/* <Select value={selectedSite} defaultValue={40} onChange={handleSiteChange}>
                      <MenuItem value={40} disabled selected>
                        Please select
                      </MenuItem>
                      {siteOptions.map((site, index) => (
                        <MenuItem key={index} value={site}>
                          {site}
                        </MenuItem>
                      ))}
                    </Select> */}
                    {/* <Select
                      className="select-option"
                      onChange={(e) => handleSiteChange(e.target.value)}
                      defaultValue={30}

                    >
                      <MenuItem value={30} disabled selected>
                        Select Site
                      </MenuItem>
                      {siteOptions.map((site, index) => (
                        <MenuItem key={index} value={site}>
                          {site}
                        </MenuItem>
                      ))}
                    </Select> */}
                    {/* <Select
                      className="select-option"
                      onChange={(e) => handleThemeChange(e.target.value)}
                      defaultValue={30}
                    >
                      <MenuItem value={30} disabled selected>
                        Select Theme
                      </MenuItem>
                      {Object.keys(allthemes).map((themeId) => (
                        <MenuItem key={themeId} value={themeId}>
                          {allthemes[themeId].name}
                        </MenuItem>
                      ))}
                    </Select> */}
                    <div style={{alignItems:'center',width:'220px',paddingLeft:'100px',gap:'20px'}}>
                   <div style={{margin:'30px'}}>
                    <ProjectConfigModal />
                   <ColorInputDialog/>
                    </div> 
                    <ThemeSelector />
                    {/* <SiteDropdown /> */}
                    </div>
                  </div>
                  {/* <CntPreview>
                    <HomeStaticPreview />
                  </CntPreview> */}
                </div>
              }
              />
              {/* <Route path="/cmp" element={<AemComponents />} /> */}
              {/* <Route path="/preview" element={<GeneralPreview />} /> */}
              <Route path="/advance" element={<Library />} />
              <Route path="/editor" element={<HtmlEditor />} />
        </Routes>
      {/* <Library /> */}
      {/* <BasicSimpleTreeView /> */}
      {/* <ProjectForm/>
      <ProjectDisplay /> */}
    </div>
  );
}

export default App;
