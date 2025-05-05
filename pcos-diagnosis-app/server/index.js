import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'process';
import fetch from 'node-fetch';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

// Initialize Express app
const app = express();
const port = 3001;
const flaskApiPort = 5001;
const flaskApiUrl = `http://localhost:${flaskApiPort}`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start Flask API server
const startModelApi = () => {
  return new Promise((resolve, reject) => {
    // Path to Python executable in virtual environment
    const pythonPath = process.platform === 'win32' 
      ? path.join(rootDir, 'venv', 'Scripts', 'python.exe')
      : path.join(rootDir, 'venv', 'bin', 'python');
    
    // Path to API script
    const scriptPath = path.join(__dirname, 'model_api.py');
    
    console.log(`Starting Flask model API: ${pythonPath} ${scriptPath}`);
    
    // Spawn Python process
    const pythonProcess = spawn(pythonPath, [scriptPath], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Flask API: ${data.toString()}`);
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.log(`Flask API Error: ${data.toString()}`);
    });
    
    pythonProcess.on('error', (error) => {
      console.error(`Failed to start Flask API: ${error}`);
      reject(error);
    });
    
    // Wait for API to be ready
    const checkHealth = async (attempts = 0) => {
      if (attempts > 30) { // Timeout after 30 seconds
        pythonProcess.kill();
        reject(new Error('Flask API failed to start'));
        return;
      }
      
      try {
        const response = await fetch(`${flaskApiUrl}/health`);
        if (response.ok) {
          console.log('Flask API is ready');
          resolve(pythonProcess);
          return;
        }
      } catch (err) {
        console.log(`Health check failed, retrying (${attempts + 1}/30): ${err.message}`);
        // API not ready yet, try again after 1 second
        setTimeout(() => checkHealth(attempts + 1), 1000);
      }
    };
    
    // Give the process a moment to start
    setTimeout(() => checkHealth(), 2000);
  });
};

// API endpoint for PCOS diagnosis
app.post('/api/diagnose', async (req, res) => {
  const { free_testosterone, dheas, fsh } = req.body;
  
  // Validate input
  if (!free_testosterone || !dheas || !fsh) {
    return res.status(400).json({ error: 'Missing required hormone values' });
  }
  
  try {
    // Call Flask API
    const response = await fetch(`${flaskApiUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ free_testosterone, dheas, fsh }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Flask API error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error || 'Error processing prediction' 
      });
    }
    
    const prediction = await response.json();
    res.json(prediction);
  } catch (error) {
    console.error('Error calling Flask API:', error);
    res.status(500).json({ error: 'Error connecting to prediction service' });
  }
});

// Normal ranges endpoint
app.get('/api/ranges', (req, res) => {
  // Return normal ranges for each hormone
  res.json({
    free_testosterone: { min: 0.1, max: 6.8, unit: 'pg/mL' },
    dheas: { min: 35, max: 30, unit: 'µg/dL' },
    fsh: { min: 4.7, max: 21.5, unit: 'mIU/mL' },
  });
});

// Start the Flask API and then the Express server
startModelApi()
  .then(() => {
    // Start the Express server
    app.listen(port, () => {
      console.log(`PCOS Diagnosis API server running on port ${port}`);
      console.log(`Flask Model API running on port ${flaskApiPort}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }); 