import React, { useState } from 'react';
import styles from './styles/contact.module.scss';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const newMessage = {
      name,
      email,
      subject,
      message,
    };

    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <form onSubmit={handleSubmit}>
          <div className={styles.item}>
            <label>Name and Surname</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} /> <br/>
          </div>
          <div className={styles.item}>
            <label>E-mail</label>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} /> <br/>
          </div>
          <div className={styles.item}>
            <label>Subject</label>
            <input type='text' value={subject} onChange={(e) => setSubject(e.target.value)} /> <br/>
          </div>
          <div className={styles.item}>
            <label>Message</label>
            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <button type="submit">Send message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
