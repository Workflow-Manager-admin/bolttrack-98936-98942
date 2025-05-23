import React, { useState } from 'react';
import './App.css';
import BOLTTest from './components/BOLTTest';
import History from './components/History';
import Info from './components/Info';

// PUBLIC_INTERFACE
/**
 * Main BOLTTrack Application
 * Contains tab navigation and container for BOLTTest, History, and Info components
 */
function App() {
  const [activeTab, setActiveTab] = useState('test');
  const [testCount, setTestCount] = useState(0);

  // Update the test count when test completes to trigger History refresh
  const handleTestComplete = () => {
    setTestCount(prevCount => prevCount + 1);
    setActiveTab('history');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">⌚</span> BOLTTrack
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="header">
            <h1 className="title">BOLTTrack</h1>
            <p className="description">
              Monitor your breathing efficiency with the Body Oxygen Level Test
            </p>
          </div>

          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'test' ? 'active' : ''}`}
              onClick={() => setActiveTab('test')}
            >
              Test
            </button>
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
            <button 
              className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'test' && (
              <BOLTTest onTestComplete={handleTestComplete} />
            )}
            
            {activeTab === 'history' && (
              <History key={testCount} />
            )}
            
            {activeTab === 'info' && (
              <Info />
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>BOLTTrack - Track your breathing efficiency</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
