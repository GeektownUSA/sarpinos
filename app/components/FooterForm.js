'use client';
import { useState } from 'react';
import axios from 'axios';
import styles from './Footer.module.css';

const FooterForm = () => {
  const [formData, setFormData] = useState({
    form: 'signup',
    email: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      window.location.href = window.location.origin + '/success';
    } else {
      alert('Error submitting form');
    }
  };

  return (
    <>
      <form className={styles.emailSignUp} name="signup" onSubmit={handleSubmit} >
        <p>
          <label>
            <span className="screen-reader-text">Email Address</span>
            <input
              placeholder="Email Address"
              type="email" name="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required onChange={handleChange}/>
          </label>
        </p>
        <p>
          <button type="submit">Sign Up</button>
        </p>
        <input type="hidden" name="form-name" value="signup"></input>
      </form>
    </>
  );
};

export default FooterForm;