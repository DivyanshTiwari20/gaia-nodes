import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Chatbot.css';
import axios from 'axios'; // Import axios to make API calls

const Chatbot = () => {
  const [output, setOutput] = useState('');

  const handleGetData = async () => {
    setOutput('Loading...');
    try {
      // Make a request to your backend API
      const response = await axios.get('http://localhost:5000/api/crypto-insights');

      const data = response.data;
      setOutput(JSON.stringify(data, null, 2)); // Format the output for better readability
    } catch (error) {
      setOutput('Error fetching data. Please try again.');
      console.error("Error fetching data:", error.response?.data || error.message); // Log detailed error
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-secondary" style={{ width: '80%', maxWidth: '500px' }}>
        <div className="card-header bg-dark">
          <h2 className="mb-0">Chatbot</h2>
        </div>
        <div className="card-body">
          <div className="output-area mb-3 p-3 rounded">
            {output || 'Click "Get Data" to fetch information.'}
          </div>
          <button className="btn btn-dark w-100" onClick={handleGetData}>
            Get Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
