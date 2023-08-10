import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  editMessage,
  deleteMessage,
  selectMessages,
} from './chatSlice';
import './App.css';
import TikTakToe from './components/TikTakToe';

function App() {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleMessage = () => {
    if (editIndex === -1) {
      dispatch(addMessage({ message: newMessage, timestamp: Date.now() }));
    } else {
      dispatch(
        editMessage({
          index: editIndex,
          message: newMessage,
          timestamp: Date.now(),
        })
      );
      setEditIndex(-1);
    }
    setNewMessage('');
  };

  const handleEdit = (index) => {
    const messageToEdit = messages[index];
    setNewMessage(messageToEdit.message);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteMessage(index));
  };

  const handleCancelEdit = () => {
    setNewMessage('');
    setEditIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessage();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div className="message-container" key={index}>
              <p className="message">{message.message}</p>
              <p className="timestamp">
                {new Date(message.timestamp).toLocaleString()}
              </p>
              {editIndex === index ? (
                <div className="message-actions">
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    Скасувати
                  </button>
                  <button className="save-button" onClick={handleMessage}>
                    Зберегти
                  </button>
                </div>
              ) : (
                <div className="message-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(index)}
                  >
                    Редагувати
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Видалити
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введіть повідомлення..."
          />
          <button className="send-button" onClick={handleMessage}>
            Надіслати
          </button>
        </div>
      </div>
      <TikTakToe />
    </div>
  );
}

export default App;
