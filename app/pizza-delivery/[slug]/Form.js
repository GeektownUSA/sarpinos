'use client';
import { useEffect, useRef } from 'react';
import styles from './Form.module.css';
import { useState } from 'react';

const Form = ({ post, posts }) => {
  const [formData, setFormData] = useState({
    form: 'feedback',
    service_store: post.acf.name,
    service_state: post.acf.state,
    phone: '',
    satisfation: 'Yes',
    email: '',
    message: '',
    mangers_name: post.acf.mangers_name,
    managers_email: post.acf.managers_email,
  });

  const dateInputRef = useRef();

  useEffect(() => {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    dateInputRef.current.min = formatDate(lastYear);
    dateInputRef.current.max = formatDate(today);
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
  return (
    <div>
      <div>
        <h2 style={{ paddingTop: '4rem' }}>Sarpino&apos;s Customer Review Policy</h2>
        <p>We receive positive and - unbelievable, but true - negative feedback from our customers. We publish, with customer permission, all feedback and reviews on our website. If the negative feedback is resolved to customer satisfaction, we take it off our web site, but we still let you know that we had it - we publish the total number of reviews.</p>
      </div>
      <h3 style={{ paddingTop: '2rem' }}>Tell Us About Your Experience</h3>
      <form className={styles.form} name="feedback" onSubmit={handleSubmit} data-netlify="true" netlify-honeypot="bot-field">
        <p className="hidden">
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>
        <p className={styles.columns}>
          <label className={styles.w50}>Were you satisfied? *
            <select placeholder="Select" name="satisfation" required onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label className={styles.grow1}>Date of your visit *
            <input
              onChange={handleChange}
              ref={dateInputRef}
              placeholder="Date"
              type="date"
              name="service_date"
              required
            />
          </label>
        </p>
        <p>
          <label>Email *
            <input placeholder="Email" type="email" name="email"
              onChange={handleChange}
              required />
          </label>
        </p>
        <p>
          <label>Phone *
            <input placeholder="Phone" type="tel"
              onChange={handleChange}
              name="phone"
              pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
              required />
          </label>
        </p>
        <p className={styles.columns}>
          <label className={styles.w50}>State
            <select
              onChange={handleChange}
              defaultValue={post.acf.state}
              placeholder="State"
              name="service_state">
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
          <label className={styles.grow1}>Store
            <select
              onChange={handleChange}
              defaultValue={post.acf.name}
              placeholder="Location"
              name="service_store">
              {posts.map((p, index) => (
                <option key={index} value={p.acf.name} dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
              ))}
            </select>
          </label>
        </p>
        <p>
          <label>What do you think about Sarpino&apos;s brand?
            <textarea
              onChange={handleChange}
              placeholder="Message"
              name="message"
              type="text"
              rows="5"
            />
          </label>
        </p>
        <p>
          <button type="submit">Submit Feedback Form</button>
        </p>
        <input type="hidden" name="form-name" value="feedback"></input>
      </form>
    </div>
  );
};

export default Form;