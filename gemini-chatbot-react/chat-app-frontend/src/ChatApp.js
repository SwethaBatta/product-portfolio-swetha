// ChatApp.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css';
import axios from 'axios';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatbox = useRef(null);

  const goToTop = () => {        
    window.scrollTo(0, 0);        
  };

  useEffect(() => {
    //chatbox.current.scrollIntoView(false);
    //goToTop();
    window.scrollTo({bottom: chatbox.current.offsetBottom, left: 0, behavior: "smooth"});
    fetchData(); // Fetch initial messages when component mounts
    const interval = setInterval(fetchData, 5000); // Poll server every 5 seconds for new messages
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sendMessage = async () => {
    if (input.trim() !== '') {
      setInput('');
      window.scrollTo({bottom: chatbox.current.offsetBottom, left: 0, behavior: "smooth"});
      //goToTop();
      try {
        await axios.post('http://localhost:5000/api/data', {message: { text: input, sender: 'Swetha' }});
        fetchData(); // Fetch updated messages after sending a new one
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  return (
    <div className="chat-container">
        <header class="msger-header">Chat support</header>
        <div className="chat-app">
            <div ref={chatbox} className="chat-messages">
                {messages.map((message, index) => (
                    <div  key={index} className={`message ${message.sender}`}>
                        <div class="msg-info">
                        <div class="msg-info-name">{message.sender}</div>
                        <div class="msg-info-time">{formatDate(new Date())}</div>
                        </div>
                        <div>{message.text}</div>
                        
                </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        sendMessage();
                    }}
                />
                <button type="submit" onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
  );
}

export default ChatApp;
