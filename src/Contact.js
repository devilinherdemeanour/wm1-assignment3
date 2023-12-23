import React from 'react';
import styles from './styles/contact.module.scss'

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <form>
          <div className={styles.item}>
            <label>Name and Surname</label>
            <input type='text'/> <br/>
          </div>
          <div className={styles.item}>
            <label>E-mail</label>
            <input type='text'/> <br/>
          </div>
          <div className={styles.item}>
            <label>Subject</label>
            <input type='text'/> <br/>
          </div>
          <div className={styles.item}>
            <label>Message</label>
            <input type='text'/>
          </div>

          <button>Send message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
