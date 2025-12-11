'use client';
import { useState, useRef, useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import Image from 'next/image';
import styles from './Form.module.css';

const Form = ({ data, posts }) => {
  const [formData, setFormData] = useState({
    form: 'contact',
    name: '',
    request: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: 'AL',
    zip: '',
    store: '',
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
      <div className={`responsive-column-container `}>
        
        <div>
          <form className={styles.form} onSubmit={handleSubmit} name="contact">
            <p className={styles.columns}>
              <label className={styles.grow1}>Name *
                <input placeholder="" type="text" name="name" required onChange={handleChange}/>
              </label>
			  <label className={styles.w33}>What type of request is this? *
                <select placeholder="Make a selection" name="request" required onChange={handleChange}>
                  <option value="">Make a selection</option>
                  <option value="Information request/genral request">Information request/genral request</option>
                  <option value="I had a poor experience at one of your stores">I had a poor experience at one of your stores</option>
                  <option value="I had a great experience at one of your stores">I had a great experience at one of your stores </option>
                  <option value="Franchise information">Franchise information</option>
				</select>  
              </label>
              <label className={styles.w33}>Store Location * 
                <select
                  defaultValue={store || "default"}
                  placeholder="Location"
                  name="event_store"
                  required
                  onChange={handleStoreChange}>
                  <option value="">Select a Location</option>
                  {[...posts]
                    .sort((a, b) => a.acf.name.localeCompare(b.acf.name))
                    .map((p, index) => (
                      <option key={index} value={p.acf.name} dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                  ))}
                </select>
              </label>
            </p>
            
            <p>
              <label>Address
                <input placeholder="" type="text" name="address" onChange={handleChange}/>
				<span className={styles.smtxt}>Street Address</span>
              </label>
            </p>
			<p>
			  <label>
                <input placeholder="" type="text" name="address2" onChange={handleChange}/>
				<span className={styles.smtxt}>Address Line 2</span>
              </label>
            </p>
            <p className={styles.columns}>
              <label className={styles.grow1}>
                <input placeholder="" type="text" name="city" onChange={handleChange}/>
				<span className={styles.smtxt}>City</span>
              </label>
              <label className={styles.w33}>
                <select placeholder="" name="state" onChange={handleChange}>
                  <option value="" >Select state</option>
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
				<span className={styles.smtxt}>State</span>
              </label>
              <label className={styles.w33}>
                <input placeholder="" type="text" name="zip" onChange={handleChange}/>
				<span className={styles.smtxt}>Zip Code</span>
				</label>
            </p>
			
            <p className={styles.columns}>
              <label className={styles.grow1}>Phone *
                <input placeholder="" type="tel"
                  name="phone"
                  pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                  required onChange={handleChange}/>
              </label>
			  
			  <label className={styles.w50}>Email *
                <input placeholder="" type="email" name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required onChange={handleChange}/>
              </label>              
            </p>

			
            <p>
              <label>Comment/Request/Feedback
                <textarea
                  placeholder=""
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
            <input type="hidden" name="form-name" value="contact"></input>
          </form>
          <p dangerouslySetInnerHTML={{ __html: data.acf?.submit_message || '' }} />
        </div>
      </div>
    </>
  );
};

export default Form;