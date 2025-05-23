import React, { useState, useEffect } from 'react';
import { getTestResults, formatDate, deleteTestResult } from '../utils/dataUtils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// PUBLIC_INTERFACE
/**
 * History component for displaying past BOLT test results
 * Shows list of results and chart visualization
 */
const History = () => {
  const [testResults, setTestResults] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'chart'

  // Load test results from localStorage on component mount
  useEffect(() => {
    const results = getTestResults();
    setTestResults(results);
  }, []);

  // Handle deleting a test result
  const handleDeleteResult = (id) => {
    const updatedResults = deleteTestResult(id);
    setTestResults(updatedResults);
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    // Sort by date ascending
    const sortedResults = [...testResults].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      labels: sortedResults.map(result => formatDate(result.date)),
      datasets: [
        {
          label: 'BOLT Score (seconds)',
          data: sortedResults.map(result => result.score),
          borderColor: 'rgb(232, 122, 65)',
          backgroundColor: 'rgba(232, 122, 65, 0.5)',
          tension: 0.2,
          pointRadius: 5,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'BOLT Score Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Seconds'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  // Get average score
  const getAverageScore = () => {
    if (testResults.length === 0) return 0;
    const total = testResults.reduce((sum, result) => sum + result.score, 0);
    return (total / testResults.length).toFixed(1);
  };

  // Get best score
  const getBestScore = () => {
    if (testResults.length === 0) return 0;
    return Math.max(...testResults.map(result => result.score));
  };

  // Get most recent score
  const getLatestScore = () => {
    if (testResults.length === 0) return 0;
    const sortedByDate = [...testResults].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return sortedByDate[0].score;
  };

  return (
    <div className="history">
      <h2>Your BOLT History</h2>
      
      {testResults.length === 0 ? (
        <div className="empty-state">
          <p>You haven't performed any BOLT tests yet. Go to the Test tab to get started!</p>
        </div>
      ) : (
        <>
          <div className="stats-summary">
            <div className="stat-item">
              <h4>Tests Taken</h4>
              <div className="stat-value">{testResults.length}</div>
            </div>
            <div className="stat-item">
              <h4>Average Score</h4>
              <div className="stat-value">{getAverageScore()}</div>
            </div>
            <div className="stat-item">
              <h4>Best Score</h4>
              <div className="stat-value">{getBestScore()}</div>
            </div>
            <div className="stat-item">
              <h4>Latest Score</h4>
              <div className="stat-value">{getLatestScore()}</div>
            </div>
          </div>

          <div className="view-toggle">
            <button 
              className={`btn-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button 
              className={`btn-toggle ${viewMode === 'chart' ? 'active' : ''}`}
              onClick={() => setViewMode('chart')}
            >
              Chart View
            </button>
          </div>
          
          {viewMode === 'list' ? (
            <div className="results-list">
              {[...testResults]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(result => (
                  <div key={result.id} className="result-item">
                    <div className="result-details">
                      <div className="result-score">{result.score} sec</div>
                      <div className="result-date">{formatDate(result.date)}</div>
                    </div>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteResult(result.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="chart-container">
              <Line options={chartOptions} data={prepareChartData()} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
