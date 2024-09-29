import React from 'react'
import Chatbot from './components/Chatbot'

// In your frontend React app
const fetchInsights = async () => {
  const response = await fetch('api/crypto-insights');
  const data = await response.json();
  console.log(data);
}


function App() {
  return (
    <Chatbot />
  )
}

export default App