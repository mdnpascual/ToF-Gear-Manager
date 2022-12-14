import React from 'react';
import logo from './logo.svg';
import './App.css';
import {OCRPage} from './OCRPage';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function App() {
  const [tabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TabContext value={tabValue}>
          <AppBar position="fixed" color="inherit" sx={{ width: 1 }}>
            <TabList onChange={handleTabChange} variant="fullWidth">
              <Tab label="Armor Analyzer" value="1" />
              <Tab label="Gear Manager" value="2" />
              <Tab label="Settings" value="3" />
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <OCRPage />
          </TabPanel>
          <TabPanel value="2">Work In Progress</TabPanel>
          <TabPanel value="3">Work In Progress</TabPanel>
        </TabContext>
      </header>
    </div>
  );
}

export default App;
