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

  useEffect(() => {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    dateInputRef.current.min = formatDate(today);
    dateInputRef.current.max = formatDate(nextYear);
  }, []);

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
      <div className={`responsive-column-container ${styles.container}`}>
        <div>
          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: data.acf?.form_headline || '' }} />
          <p dangerouslySetInnerHTML={{ __html: data.acf?.form_description || '' }} />
          <div className={styles.animation}>
            <Image src={'/heart-white-fill.svg'} width={45} height={45} className={`heartbeat-rotate ${styles.whiteFillHeart}`} alt="red fill heart" />
            <Image src={'/heart-white-fill.svg'} width={43} height={43} className={`heartbeat-pulse ${styles.whiteFillHeart2}`} alt="green fill heart" />
            <Image src={'/heart-green-outline.svg'} width={45} height={45} className={`slide-up-down ${styles.greenOutlineHeart}`} alt="green outline heart" />
          </div>
        </div>
        <div>
          <form className={styles.form} onSubmit={handleSubmit} name="catering">
            <p>
              <label>Name *
                <input placeholder="Name" type="text" name="name" required onChange={handleChange}/>
              </label>
            </p>
            <p>
              <label>Email *
                <input placeholder="Email" type="email" name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required onChange={handleChange}/>
              </label>
            </p>
            <p>
              <label>Phone *
                <input placeholder="Phone" type="tel"
                  name="phone"
                  pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                  required onChange={handleChange}/>
              </label>
            </p>
            <p>
              <label>Address of Event or Group Order
                <input placeholder="Address" type="text" name="event_address" onChange={handleChange}/>
              </label>
            </p>
            <p className={styles.columns}>
              <label className={styles.grow1}>City
                <input placeholder="City" type="text" name="event_city" onChange={handleChange}/>
              </label>
              <label className={styles.w50}>State
                <select placeholder="State" name="event_state" onChange={handleChange}>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DC">DC</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="PR">PR</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="VI">VI</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                </select>
              </label>
              <label className={styles.w100}>Zip
                <input placeholder="Zip" type="text" name="event_zip" onChange={handleChange}/></label>
            </p>
            <p>
              <label>Your Store
                <select
                  defaultValue={store || "default"}
                  placeholder="Location"
                  name="event_store"
                  required
                  onChange={handleStoreChange}>
                  <option value="default" disabled>Select a store</option>
                  {posts.map((p, index) => (
                    <option key={index} value={p.acf.name} dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                  ))}
                </select>
              </label>
            </p>
            <p>
              <label>Date of Catering Needs
                <input
                  ref={dateInputRef}
                  placeholder="Event Date"
                  type="date"
                  name="event_date"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <label>How Can We Help?
                <textarea
                  placeholder="Message"
                  name="message"
                  type="text"
                  rows="5"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <button type="submit">Submit Contact Form</button>
            </p>
            <input type="hidden" name="form-name" value="catering"></input>
          </form>
          <p dangerouslySetInnerHTML={{ __html: data.acf?.submit_message || '' }} />
        </div>
      </div>
    </>
  );
};

export default Form;