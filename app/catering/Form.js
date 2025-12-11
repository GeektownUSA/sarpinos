'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import Image from 'next/image';
import styles from './Form.module.css';

const Form = ({ data, posts }) => {
  const [formData, setFormData] = useState({
    form: 'catering',
    name: '',
    email: '',
    phone: '',
    event_address: '',
    event_city: '',
    event_state: 'AL',
    event_zip: '',
    store: '',
    event_date: '',
    message: '',
    managers_email: '',
  });
  const dateInputRef = useRef();
  const { store } = useContext(StoreContext);

  // useEffect(() => {
    // const today = new Date();
    // const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    // dateInputRef.current.min = formatDate(today);
    // dateInputRef.current.max = formatDate(nextYear);
  // }, []);

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

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  // SET STORE EMAIL
  const [storeEmail, setStoreEmail] = useState('');

  const handleStoreChange = (event) => {
    const selectedStore = event.target.value;
    
    // const email = getEmailForStore(selectedStore);
    const email = posts.reduce((email, p) => {
      if (p.acf.name == selectedStore) email = p.acf.managers_email;
      return email;
    }, null);

    setFormData({
      ...formData,
      ['store']: selectedStore,
      ['managers_email']: email,
    });

  };

  return (
    <>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.acf.how_it_works_content || '' }} />
      
    </>
  );
};

export default Form;