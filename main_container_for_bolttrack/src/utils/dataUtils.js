// PUBLIC_INTERFACE
/**
 * Utility functions for managing BOLT test data in localStorage
 */

const STORAGE_KEY = 'bolttrack_test_results';

/**
 * Save a new BOLT test result
 * @param {number} score - The BOLT score (breath-hold time in seconds)
 * @param {string} date - The date of the test (ISO string)
 * @returns {object} The saved test result
 */
export const saveTestResult = (score) => {
  // Get existing results
  const existingResults = getTestResults();
  
  // Create new result object
  const newResult = {
    id: Date.now(), // Use timestamp as unique ID
    score: score,
    date: new Date().toISOString(),
  };
  
  // Add new result to array
  const updatedResults = [...existingResults, newResult];
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  
  return newResult;
};

/**
 * Get all saved test results
 * @returns {Array} Array of test result objects
 */
export const getTestResults = () => {
  const results = localStorage.getItem(STORAGE_KEY);
  return results ? JSON.parse(results) : [];
};

/**
 * Delete a test result by ID
 * @param {number} id - The ID of the test result to delete
 * @returns {Array} Updated array of test results
 */
export const deleteTestResult = (id) => {
  const existingResults = getTestResults();
  const updatedResults = existingResults.filter(result => result.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  
  return updatedResults;
};

/**
 * Clear all test results
 * @returns {Array} Empty array
 */
export const clearAllTestResults = () => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};

/**
 * Get formatted date string from ISO date
 * @param {string} isoDate - The ISO date string
 * @returns {string} Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};
