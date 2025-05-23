import React, { useState, useEffect, useRef } from 'react';
import { saveTestResult } from '../utils/dataUtils';

// PUBLIC_INTERFACE
/**
 * BOLTTest component for performing the Body Oxygen Level Test
 * Guides user through the test and records breath-hold time
 */
const BOLTTest = ({ onTestComplete }) => {
  const [testState, setTestState] = useState('ready'); // ready, countdown, testing, completed
  const [timer, setTimer] = useState(0);
  const [countdownValue, setCountdownValue] = useState(3);
  const timerRef = useRef(null);
  const [savedResult, setSavedResult] = useState(null);

  // Handle countdown before starting test
  useEffect(() => {
    if (testState === 'countdown' && countdownValue > 0) {
      const countdownInterval = setTimeout(() => {
        setCountdownValue(countdownValue - 1);
      }, 1000);
      
      return () => clearTimeout(countdownInterval);
    } else if (testState === 'countdown' && countdownValue === 0) {
      startTest();
    }
  }, [testState, countdownValue]);
  
  // Handle test timing
  useEffect(() => {
    if (testState === 'testing') {
      timerRef.current = setInterval(() => {
        setTimer(prevTime => prevTime + 0.1);
      }, 100);
      
      return () => clearInterval(timerRef.current);
    }
  }, [testState]);

  // Start the countdown before test
  const startCountdown = () => {
    setTestState('countdown');
    setCountdownValue(3);
  };
  
  // Start the actual test
  const startTest = () => {
    setTestState('testing');
    setTimer(0);
  };
  
  // End the test
  const endTest = () => {
    clearInterval(timerRef.current);
    setTestState('completed');
    // Round to one decimal place
    const finalScore = Math.round(timer * 10) / 10;
    setSavedResult(null);
  };
  
  // Save the test result
  const saveResult = () => {
    const finalScore = Math.round(timer * 10) / 10;
    const result = saveTestResult(finalScore);
    setSavedResult(result);
    if (onTestComplete) {
      onTestComplete(result);
    }
  };
  
  // Reset to start again
  const resetTest = () => {
    setTestState('ready');
    setTimer(0);
    setSavedResult(null);
  };

  const formatTime = (time) => {
    return time.toFixed(1);
  };

  return (
    <div className="bolt-test">
      <div className="test-card">
        <h2>Body Oxygen Level Test</h2>
        
        {testState === 'ready' && (
          <div className="test-instructions">
            <p>The BOLT (Body Oxygen Level Test) measures your body's tolerance to reduced oxygen and increased CO2 levels:</p>
            <ol>
              <li>Sit comfortably and breathe normally for 2 minutes</li>
              <li>Take a normal breath in and a normal breath out</li>
              <li>Hold your breath (after exhaling)</li>
              <li>Start the timer and hold until you feel the first urge to breathe</li>
              <li>Press the stop button as soon as you feel the need to breathe</li>
            </ol>
            <div className="btn-container">
              <button className="btn btn-large" onClick={startCountdown}>Start Test</button>
            </div>
          </div>
        )}
        
        {testState === 'countdown' && (
          <div className="test-countdown">
            <h3>Get Ready!</h3>
            <div className="countdown-value">{countdownValue}</div>
            <p>Breathe normally, then exhale and hold your breath</p>
          </div>
        )}
        
        {testState === 'testing' && (
          <div className="test-in-progress">
            <div className="timer-display">{formatTime(timer)}</div>
            <p>Hold your breath until you feel the first urge to breathe</p>
            <button className="btn btn-large" onClick={endTest}>Stop</button>
          </div>
        )}
        
        {testState === 'completed' && (
          <div className="test-completed">
            <h3>Your BOLT Score</h3>
            <div className="result-display">{formatTime(timer)}</div>
            <div className="result-explanation">
              <p>Your BOLT score is the number of seconds you were able to hold your breath comfortably.</p>
              
              {timer < 10 && (
                <p>Score under 10: This indicates poor breathing efficiency. Consider practicing breathing exercises regularly.</p>
              )}
              {timer >= 10 && timer < 20 && (
                <p>Score between 10-20: This is an average score. Regular practice can help improve your breathing efficiency.</p>
              )}
              {timer >= 20 && timer < 30 && (
                <p>Score between 20-30: This is a good score, indicating good breathing efficiency.</p>
              )}
              {timer >= 30 && (
                <p>Score over 30: Excellent breathing efficiency!</p>
              )}
            </div>
            <div className="result-actions">
              {!savedResult ? (
                <button className="btn" onClick={saveResult}>Save Result</button>
              ) : (
                <p className="success-message">Result saved!</p>
              )}
              <button className="btn" onClick={resetTest}>New Test</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BOLTTest;
