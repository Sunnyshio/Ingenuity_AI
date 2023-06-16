import React, { useState, useRef } from 'react'
import './App.css';
import axios from 'axios';
import Home from './Pages/Home'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8080/chat', { prompt: inputValue });
      setMessages([...messages, { content: inputValue, sender: 'user' }]);
      setMessages([...messages, { content: response.data, sender: 'bot' }]);
      setInputValue('');
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div>
    <Home />
    {/* <div>
      <div className="input">
        <div>
          <label htmlFor="inline-full-name">Just ask anything:</label>
        </div>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={sendMessage}>
            Submit
          </button>
        </div>
      </div>
      <div className="w-full items-center mt-4" style={{ width: '10rem' }}>
        {messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
      </div>
    </div> */}
  </div>
);
}

export default App;
