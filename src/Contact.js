import React from 'react';

const Contact = () => {
  return (
    <div>
     <form>
        <label>Name and Surname</label>
        <input type='text'/> <br/>
        <label>E-mail</label>
        <input type='text'/> <br/>
        <label>Subject</label>
        <input type='text'/> <br/>
        <label>Message</label>
        <input type='text'/>
     </form>
    </div>
  );
};

export default Contact;
