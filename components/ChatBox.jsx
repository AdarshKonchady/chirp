import React, { useEffect, useState, useRef } from 'react';
import { useChannel } from 'ably/react';
import styles from './ChatBox.module.css';

export default function ChatBox() {
  const inputBoxRef = useRef(null);
  const messageEndRef = useRef(null);
  const formRef = useRef(null);

  const [messageText, setMessageText] = useState('');
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel, ably } = useChannel('chat-demo', (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText) => {
    channel.publish({ name: 'chat-message', data: messageText });
    setMessageText('');
    inputBoxRef.current?.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  // Handle focus to ensure visibility on mobile
  const handleFocus = () => {
    // Add a small delay to allow the keyboard to appear
    setTimeout(() => {
      // Scroll to the bottom of the page to make input visible
      window.scrollTo(0, document.body.scrollHeight);
      
      // On some devices, we need to scroll the form into view
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 300);
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? 'me' : 'other';
    return (
      <span key={index} className={styles.message} data-author={author}>
        {message.data}
      </span>
    );
  });

  useEffect(() => {
    // Scroll to the latest message
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [receivedMessages]);

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={messageEndRef}></div>
      </div>
      <form ref={formRef} onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={inputBoxRef}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onTouchStart={handleFocus}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
}
