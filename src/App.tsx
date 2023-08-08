import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, selectMessages } from './chatSlice';
import './App.css';

function App() {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');

  const handleMessage = () => {
    dispatch(addMessage(newMessage));
    setNewMessage('');
  };

  return (
    <div className="App">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleMessage}>Надіслати</button>

      {messages.map((message, index) => (
        <p className="message" key={index}>
          {message}
        </p>
      ))}
    </div>
  );
}

export default App;
