import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Chatbot.css';
import axios from 'axios'; // Import axios to make API calls

const Chatbot = () => {
  const [output, setOutput] = useState('');  // State to manage the output text

  const handleGetData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crypto-insights');
      
      // Log the response to check what is being returned
      console.log(response);
  
      // Ensure the data structure exists
      const data = response.data;
  
      // Check if data is properly defined
      if (data) {
        const bitcoinPrice = data.bitcoin?.usd || 'N/A';
        const ethereumPrice = data.ethereum?.usd || 'N/A';
  
        // Update the output state with the formatted data
        setOutput(`
          Bitcoin: $${bitcoinPrice} USD
          Ethereum: $${ethereumPrice} USD
        `);
      } else {
        setOutput('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setOutput('Error loading data');
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-secondary" style={{ width: '80%', maxWidth: '500px' }}>
        <div className="card-header bg-dark">
          <h2 className="mb-0">Cryptocurrency Prices</h2>
        </div>
        <div className="card-body">
          <div className="output-area mb-3 p-3 rounded bg-light text-dark" id="cryptoData">
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
