'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import { StoreContext } from '../context/useStoreContext';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './Form.module.css';

const SignatureCanvas = dynamic(() => import('react-signature-canvas'), { ssr: false });

const Form = ({ data, posts }) => {
  const [formData, setFormData] = useState({
    form: 'employment',
    cuurent_date: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    present_address: '',
    present_address2: '',
    present_city: '',
    present_state: 'AL',
    present_zip: '',
    address_confirmation: '',
    permanent_address: '',
    permanent_address2: '',
	permanent_city: '',
	permanent_state: '',
	permanent_zip: '',
	phone: '',
	email: '',
	age_confirmation: '',
	date_of_birth: '',
	work_legally: '',
	work_store: '',
	position: '',
	salary_desired: '',
	work_start_date: '',
	employed_now: '',
	present_employer: '',
	applied_before: '',
	applied_before_location: '',
	applied_before_time: '',
	most_recent_employer_name: '',
	most_recent_employer_phone: '',
	most_recent_employer_address: '',
	most_recent_employer_address2: '',
	most_recent_employer_city: '',
	most_recent_employer_state: '',
	most_recent_employer_zip: '',
	most_recent_position: '',
	first_employer_start_date: '',
	first_employer_leave_date: '',
	leaving_reason: '',
	second_employer_name: '',
	second_employer_phone: '',
	second_employer_address: '',
	second_employer_address2: '',
	second_employer_city: '',
	second_employer_state: '',
	second_employer_zip: '',
	second_employer_position: '',
	second__employer_start_date: '',
	second_employer_leave_date: '',
	second_leaving_reason: '',
	other_employer_name: '',
	other_employer_phone: '',
	other_employer_address: '',
	other_employer_address2: '',
	other_employer_city: '',
	other_employer_state: '',
	other_employer_zip: '',
	other_employer_position: '',
	other_employer_start_date: '',
	other_employer_leave_date: '',
	other_leaving_reason: '',
	start_date: '',
	end_date: '',
	explanation: '',
	ref_name: '',
	ref_address: '',
	ref_phone: '',
	ref_years_acquainted: '',
	delivery_drivers: '',
	vehicle_assault: '',
	vehicle_assault_explaination: '',
	violation: '',
	violation_explaination: '',
	license_suspended: '',
	license_suspended_exlaination: '',
	signature: '',
	today_date: '',
  });
  const dateInputRef = useRef();
  const { store } = useContext(StoreContext);
  const signaturePadRef = useRef(null);
  
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('no');
  const [selectedOption3, setSelectedOption3] = useState('no');
  const [selectedOption4, setSelectedOption4] = useState('no');
  const [selectedOption5, setSelectedOption5] = useState('no');
  const [selectedOption6, setSelectedOption6] = useState('no');
  const [selectedOption7, setSelectedOption7] = useState('no');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleSelectChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };
  const handleSelectChange2 = (e) => {
    setSelectedOption2(e.target.value);
  };
  const handleSelectChange3 = (e) => {
    setSelectedOption3(e.target.value);
  };
  const handleSelectChange4 = (e) => {
    setSelectedOption4(e.target.value);
  };
  const handleSelectChange5 = (e) => {
    setSelectedOption5(e.target.value);
  };
  const handleSelectChange6 = (e) => {
    setSelectedOption6(e.target.value);
  };
  const handleSelectChange7 = (e) => {
    setSelectedOption7(e.target.value);
  };

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
  
  const handleSignatureClear = () => {
    const pad = signaturePadRef.current;
    if (pad) {
      pad.clear(); // clears strokes on the signature pad
      setFormData((prev) => ({ ...prev, signature: '' })); // clears saved base64 signature in state
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
	
	const pad = signaturePadRef.current;
    let signatureBase64 = '';

    // Only capture the signature at submit time
    if (pad && !pad.isEmpty()) {
      signatureBase64 = pad.toDataURL(); // Get the signature as base64
    }

    const payload = { ...formData, signature: signatureBase64 };
	
	const updatedFormData = {
      ...formData,
      signature: signaturePadRef.current ? signaturePadRef.current.toDataURL() : '', // Ensure the ref is available
    };
	
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
  
  const handleClearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
    setFormData({ ...formData, signature: '' });
  };

  const handleSaveSignature = () => {
    if (signaturePadRef.current) {
      const signatureDataUrl = signaturePadRef.current.toDataURL();
      setFormData({ ...formData, signature: signatureDataUrl });
    }
  };


  return (
    <>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.acf.how_it_works_content || '' }} />
      <div className={`responsive-column-container `}>
        
        <div>
          <form className={styles.form} onSubmit={handleSubmit} name="employment">
            
			<p className={styles.columns}>
              <label className={styles.w50}>Date *
                <input ref={dateInputRef} placeholder="" type="date" name="cuurent_date" required onChange={handleChange} />
              </label>
            </p>
			
			<div className="break-form">
				<h3>Personal Info</h3>
			</div>
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Last Name *
                <input placeholder="" type="text" name="last_name" required onChange={handleChange}/>
              </label>
			  <label className={styles.grow1}>First Name *
                <input placeholder="" type="text" name="first_name" required onChange={handleChange}/>
              </label>
			  <label className={styles.grow1}>Middle Name *
                <input placeholder="" type="text" name="middle_name" required onChange={handleChange}/>
              </label>
            </p>
            
            <p>
              <label>Present Address
                <input placeholder="" type="text" name="present_address" required onChange={handleChange}/>
				<span className={styles.smtxt}>Street Address</span>
              </label>
            </p>
			<p>
			  <label>
                <input placeholder="" type="text" name="present_address2" required onChange={handleChange}/>
				<span className={styles.smtxt}>Address Line 2</span>
              </label>
            </p>
            <p className={styles.columns}>
              <label className={styles.grow1}>
                <input placeholder="" type="text" name="present_city" required onChange={handleChange}/>
				<span className={styles.smtxt}>City</span>
              </label>
              <label className={styles.w33}>
                <select placeholder="" name="present_state" required onChange={handleChange}>
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
                <input placeholder="" type="text" name="present_zip" required onChange={handleChange}/>
				<span className={styles.smtxt}>Zip Code</span>
				</label>
            </p>
			
			<p className={styles.columns}>
			  <label className={styles.w50}>
				Is this also your Permanent Address? *
				<select
				  placeholder=""
				  value={selectedOption}
				  name="address_confirmation"
				  onChange={handleSelectChange}
				>
				  <option value="yes">Yes</option>
				  <option value="no">No</option>
				</select>
			  </label>
			</p>

			{selectedOption === 'no' && (
			  <>
				<p>
				  <label>
					Permanent Address *
					<input
					  placeholder=""
					  type="text"
					  name="permanent_address"
					  required
					  onChange={handleChange}
					/>
					<span className={styles.smtxt}>Street Address</span>
				  </label>
				</p>
				<p>
				  <label>
					<input
					  placeholder=""
					  type="text"
					  name="permanent_address2"
					  required
					  onChange={handleChange}
					/>
					<span className={styles.smtxt}>Address Line 2</span>
				  </label>
				</p>
				<p className={styles.columns}>
				  <label className={styles.grow1}>
					<input
					  placeholder=""
					  type="text"
					  required
					  name="permanent_city"
					  onChange={handleChange}
					/>
					<span className={styles.smtxt}>City</span>
				  </label>
				  <label className={styles.w33}>
					<select placeholder="" name="permanent_state" required onChange={handleChange}>
					  <option value="">Select state</option>
					  {/* Add more states as needed */}
					  <option value="AL">AL</option>
					  <option value="AK">AK</option>
					  <option value="AZ">AZ</option>
					  <option value="CA">CA</option>
					</select>
					<span className={styles.smtxt}>State</span>
				  </label>
				  <label className={styles.w33}>
					<input
					  placeholder=""
					  type="text"
					  name="permanent_zip"
					  required
					  onChange={handleChange}
					/>
					<span className={styles.smtxt}>Zip Code</span>
				  </label>
				</p>
			  </>
			)}

			
            <p className={styles.columns}>
              <label className={styles.grow1}>Phone *
                <input placeholder="" required type="tel"
                  name="phone"
                  pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                  required onChange={handleChange}/>
              </label>
			  
			  <label className={styles.w50}>Email *
                <input placeholder="" required type="email" name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required onChange={handleChange}/>
              </label>              
            </p>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Are you 18 years of age or older? *
                <select placeholder="" value={selectedOption1} name="age_confirmation" onChange={handleSelectChange1}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
				</select>	
			  </label>
			  
			  {selectedOption1 === 'no' && (
				<>
					<label className={styles.w50}>Date of Birth *
						<input ref={dateInputRef} placeholder="" type="date" name="date_of_birth" required onChange={handleChange} />
					</label>	
				</>
			  )}
			  </p>
			  
			  <p className={styles.columns}>
			  <label className={styles.w50}>Are you legally able to work in the United States? *
                <select placeholder="" name="work_legally" onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
				</select>	
			  </label>
            </p>

			<div className="break-form">
				<h3>Employment Desired</h3>
			</div>	
			
			<p className={styles.columns}>
               <label className={styles.w50}>Which store would you like to work at? *
					<select
					  defaultValue={store || "default"}
					  placeholder="Location"
					  name="work_store"
					  required
					  onChange={handleStoreChange}>
					  <option value="default" disabled>Select a store</option>
					  {posts.map((p, index) => (
						<option key={index} value={p.acf.name} dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
					  ))}
					</select>
				</label>
				<label className={styles.w50}>Position *
					<input placeholder="" type="text" name="position" required onChange={handleChange}/>
				</label>
            </p>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Salary Desired *
                <input placeholder="" type="text" name="salary_desired" required onChange={handleChange}/>
			  </label>
			  
			  <label className={styles.w50}>Date you can start *
                <input ref={dateInputRef} placeholder="Date you can start" type="date" name="work_start_date" required onChange={handleChange} />
              </label>
            </p>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Are you employed now? *
                <select value={selectedOption2} name="employed_now" onChange={handleSelectChange2}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
				</select>	
			  </label>
			  
			  {selectedOption2 === 'yes' && (
				<>
				  <label className={styles.w50}>May we inquire of your present employer? *
					<select placeholder="" name="present_employer" onChange={handleChange}>
					  <option value="yes">Yes</option>
					  <option value="no">No</option>
					</select>	
				  </label>
				</>
			  )}		
			  
			</p>  
			
			<p className={styles.columns}>  
			  <label className={styles.w50}>Have you ever applied to this company before? *
                <select value={selectedOption3} name="applied_before" onChange={handleSelectChange3}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
				</select>	
			  </label>
			  
			  {selectedOption3 === 'yes' && (
				<>
				  <label className={styles.w50}>Where? *
					<input placeholder="" type="text" name="applied_before_location" required onChange={handleChange}/>
				  </label>
				  
				  <label className={styles.w50}>When? *
					<input placeholder="" type="text" name="applied_before_time" required onChange={handleChange}/>
				  </label>
				</>
			  )}
			  
            </p>
			
			<div className="break-form">
				<h3>Work Experience</h3>
				<p>Note: Start with most recent position, furnish dates (month and year) and explanations for each period of unemployment of one month or more.</p>
			</div>	
			
			<h4>Most Recent Employer</h4>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Name of Employer *
                <input placeholder="" type="text" name="most_recent_employer_name" required onChange={handleChange}/>
              </label>  
			  
			  <label className={styles.grow1}>Phone *
                <input placeholder="" type="tel"
                  name="most_recent_employer_phone"
                  pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                  required onChange={handleChange}/>
              </label>
			        
            </p>
			
			<p>
              <label>Address *
                <input placeholder="" type="text" name="most_recent_employer_address" required onChange={handleChange}/>
				<span className={styles.smtxt}>Street Address</span>
              </label>
            </p>
			<p>
			  <label>
                <input placeholder="" type="text" name="most_recent_employer_address2" required onChange={handleChange}/>
				<span className={styles.smtxt}>Address Line 2</span>
              </label>
            </p>
            <p className={styles.columns}>
              <label className={styles.grow1}>
                <input placeholder="" type="text" name="most_recent_employer_city" required onChange={handleChange}/>
				<span className={styles.smtxt}>City</span>
              </label>
              <label className={styles.w33}>
                <select placeholder="" name="most_recent_employer_state" required onChange={handleChange}>
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
                <input placeholder="" type="text" name="most_recent_employer_zip" required onChange={handleChange}/>
				<span className={styles.smtxt}>Zip Code</span>
				</label>
            </p>
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Position *
                <input placeholder="" type="text" name="most_recent_position" required onChange={handleChange}/>
			  </label>
			  
			  <label className={styles.grow1}>Start Date *
                <input placeholder="" type="text" name="first_employer_start_date" required onChange={handleChange} />
				<span className={styles.smtxt}>Month and Year</span>
              </label>
			  
			  <label className={styles.grow1}>Leave  Date *
                <input placeholder="" type="text" name="first_employer_leave_date" required onChange={handleChange} />
				<span className={styles.smtxt}>Month and Year</span>
              </label>
            </p>
			
            <p>
              <label>Reason for leaving *
                <textarea
                  placeholder=""
                  name="leaving_reason"
                  type="text"
                  rows="5"
				  required
                  onChange={handleChange}
                />
              </label>
            </p>
			
			<h4>Second Most Recent Employer</h4>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Name of Employer *
                <input placeholder="" type="text" name="second_employer_name" required onChange={handleChange}/>
              </label>  
			  
			  <label className={styles.grow1}>Phone *
                <input placeholder="" type="tel"
                  name="second_employer_phone"
                  pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                  required onChange={handleChange}/>
              </label>
			        
            </p>
			
			<p>
              <label>Address
                <input placeholder="" type="text" name="second_employer_address" onChange={handleChange}/>
				<span className={styles.smtxt}>Street Address</span>
              </label>
            </p>
			<p>
			  <label>
                <input placeholder="" type="text" name="second_employer_address2" onChange={handleChange}/>
				<span className={styles.smtxt}>Address Line 2</span>
              </label>
            </p>
            <p className={styles.columns}>
              <label className={styles.grow1}>
                <input placeholder="" type="text" name="second_employer_city" onChange={handleChange}/>
				<span className={styles.smtxt}>City</span>
              </label>
              <label className={styles.w33}>
                <select placeholder="" name="second_employer_state" onChange={handleChange}>
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
                <input placeholder="" type="text" name="second_employer_zip" onChange={handleChange}/>
				<span className={styles.smtxt}>Zip Code</span>
				</label>
            </p>
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Position
                <input placeholder="" type="text" name="second_employer_position" onChange={handleChange}/>
			  </label>
			  
			  <label className={styles.grow1}>Start Date
                <input placeholder="" type="text" name="second__employer_start_date" onChange={handleChange} />
				<span className={styles.smtxt}>Month and Year</span>
              </label>
			  
			  <label className={styles.grow1}>Leave  Date
                <input placeholder="" type="text" name="second_employer_leave_date" onChange={handleChange} />
				<span className={styles.smtxt}>Month and Year</span>
              </label>
            </p>
			
            <p>
              <label>Reason for leaving *
                <textarea
                  placeholder=""
                  name="second_leaving_reason"
                  type="text"
                  rows="5"
                  onChange={handleChange}
                />
              </label>
            </p>
			
			<h4>Other Employer</h4>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Name of Employer *
                <input placeholder="" type="text" name="other_employer_name" required onChange={handleChange}/>
              </label>  
			  
			  <label className={styles.grow1}>Phone *
                <input placeholder="" type="tel"
                  name="other_employer_phone"
                  pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                  required onChange={handleChange}/>
              </label>
			        
            </p>
			
			<p>
              <label>Address
                <input placeholder="" type="text" name="other_employer_address" onChange={handleChange}/>
				<span className={styles.smtxt}>Street Address</span>
              </label>
            </p>
			<p>
			  <label>
                <input placeholder="" type="text" name="other_employer_address2" onChange={handleChange}/>
				<span className={styles.smtxt}>Address Line 2</span>
              </label>
            </p>
            <p className={styles.columns}>
              <label className={styles.grow1}>
                <input placeholder="" type="text" name="other_employer_city" onChange={handleChange}/>
				<span className={styles.smtxt}>City</span>
              </label>
              <label className={styles.w33}>
                <select placeholder="" name="other_employer_state" onChange={handleChange}>
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
                <input placeholder="" type="text" name="other_employer_zip" onChange={handleChange}/>
				<span className={styles.smtxt}>Zip Code</span>
				</label>
            </p>
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Position
                <input placeholder="" type="text" name="other_employer_position" onChange={handleChange}/>
			  </label>
			  
			  <label className={styles.grow1}>Start Date
                <input placeholder="" type="text" name="other_employer_start_date" onChange={handleChange} />
				<span className={styles.smtxt}>Month and Year</span>
              </label>
			  
			  <label className={styles.grow1}>Leave  Date
                <input placeholder="" type="text" name="other_employer_leave_date" onChange={handleChange} />
				<span className={styles.smtxt}>Month and Year</span>
              </label>
            </p>
			
            <p>
              <label>Reason for leaving *
                <textarea
                  placeholder=""
                  name="other_leaving_reason"
                  type="text"
                  rows="5"
                  onChange={handleChange}
                />
              </label>
            </p>
			
			<h6>Please explain any periods of unemployment of one month or more</h6>
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Start Date
                <input ref={dateInputRef} placeholder="" type="date" name="start_date" onChange={handleChange}/>
              </label>
              <label className={styles.grow1}>End Date
                <input ref={dateInputRef} placeholder="" type="date" name="end_date" onChange={handleChange}/>
              </label>
              <label className={styles.grow1}>Explanation
                <input placeholder="" type="text" name="explanation" onChange={handleChange}/>
				</label>
            </p>
			<div className="break-form">
				<h3>References</h3>
				<p>List up to 3 people not related to you, whom you have known at least one year.</p>
			</div>	
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Name
                <input placeholder="" type="text" name="ref_name" onChange={handleChange}/>
              </label>
              <label className={styles.grow1}>Address
                <input placeholder="" type="text" name="ref_address" onChange={handleChange}/>
              </label>
              <label className={styles.grow1}>Phone
                <input placeholder="Phone" type="tel" name="ref_phone" onChange={handleChange}/>
				</label>
				<label className={styles.grow1}>Years Acquainted
                <input placeholder="" type="text" name="ref_years_acquainted" onChange={handleChange}/>
				</label>
            </p>
			
			<div className="break-form">
				<h3>Delivery Drivers Only</h3>
			</div>	
			
			<p className={styles.columns}>
              <label className={styles.grow1}>Are you applying to be a Delivery Driver? *
                <select value={selectedOption4} name="delivery_drivers" onChange={handleSelectChange4} >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
				</select>	
			  </label>
			</p>
			
			{selectedOption4 === 'yes' && (
				<>
				<p>A copy of the following is required from each applicant:</p>
				<p>a) Driver’s License;</p>
				<p>b) Vehicle Registration;</p>
				<p>c) Auto Liability Insurance Policy (Vehicle only)</p>
				<p>Please bring these items to your interview.</p>
				
				<p className={styles.columns}>
				<label className={styles.grow1}>Have you ever been convicted of a crime involving a motor vehicle, including vehicular homicide or assault? *
                  <select value={selectedOption5} name="vehicle_assault" onChange={handleSelectChange5} >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
				  </select>	
			    </label>
				</p>
				
				{selectedOption5 === 'yes' && (
					<>
					<p className={styles.columns}>
					  <label className={styles.grow1}>Please explain:? *
						<textarea
						  placeholder="Message"
						  name="vehicle_assault_explaination"
						  type="text"
						  rows="5"
						  required
						  onChange={handleChange}
						/>
					  </label>
					 </p> 
					</>
				)}
				
				<p className={styles.columns}>
				<label className={styles.grow1}>In the last 5 years, have you ever received a violation for DUI or open container/chemical test failure/possession of a controlled substance? *
                  <select value={selectedOption6} name="violation" onChange={handleSelectChange6} >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
				  </select>	
			    </label>
				</p>
				
				{selectedOption6 === 'yes' && (
					<>
					<p className={styles.columns}>
					  <label className={styles.grow1}>Please explain:? *
						<textarea
						  placeholder="Message"
						  name="violation_explaination"
						  type="text"
						  rows="5"
						  required
						  onChange={handleChange}
						/>
					  </label>
					 </p> 
					</>
				)}
				
				<p className={styles.columns}>
				<label className={styles.grow1}>Has your driver’s license ever been suspended or revoked? *
                  <select value={selectedOption7} name="license_suspended" onChange={handleSelectChange7} >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
				  </select>	
			    </label>
				</p>
				
				{selectedOption7 === 'yes' && (
					<>
					<p className={styles.columns}>
					  <label className={styles.grow1}>Please explain:? *
						<textarea
						  placeholder="Message"
						  name="license_suspended_exlaination"
						  type="text"
						  rows="5"
						  required
						  onChange={handleChange}
						/>
					  </label>
					 </p> 
					</>
				)}
			  
				</>
			)}
			
			<div className="break-form">
				<h3>Legal Agreements and Signature</h3>
			</div>
			
			<p>I CERTIFY THAT THE FACTS CONTAINED IN THIS APPLICATION ARE TRUE AND COMPLETE TO THE BEST OF MY KNOWLEDGE AND UNDERSTAND THAT, IF I AM EMPLOYED, ANY OMISSION OR FALSIFIED STATEMENTS ON THIS APPLICATION SHALL BE GROUNDS FOR DISMISSAL.</p>

			<p>I AUTHORIZE INVESTIGATION OF ALL STATEMENTS CONTAINED HEREIN AND THE REFERENCES LISTED ABOVE TO GIVE YOU ANY AND ALL INFORMATION CONCERNING MY PREVIOUS EMPLOYMENT AND ANY PERTINENT INFORMATION THEY MAY HAVE, PERSONAL OR OTHERWISE, AND RELEASE ALL PARTIES FROM ALL LIABILITY FOR ANY DAMAGE THAT MAY RESULT FROM FURNISHING SAME TO YOU.</p>

			<p>I UNDERSTAND THAT NOTHING IN THIS EMPLOYMENT APPLICATION, IN COMPANY STATEMENTS OF PERSONNEL POLICIES, OR IN MY COMMUNICATION WITH ANY EMPLOYEE OR OFFICIAL IS INTENDED TO CREATE AN EMPLOYMENT CONTRACT BETWEEN THE COMPANY AND ME, AND THAT MY EMPLOYMENT WITH THE COMPANY IS ENTERED INTO VOLUNTARILY, AND THAT I MAY RESIGN AT ANY TIME. SIMILARLY, MY EMPLOYMENT MAYBE TERMINATED WITH OR WITHOUT CAUSE AT ANY TIME WITHOUT PRIOR NOTICE.</p>
			
			<p>
              <label className={styles.signaturePad}>
                  <SignatureCanvas
                    ref={signaturePadRef}
                    backgroundColor="white"
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
                  />
                <button type="button" onClick={handleSignatureClear}>Clear Signature</button>
              </label>
            </p>
			
			<p className={styles.columns}>
              <label className={styles.w50}>Today's Date *
                <input ref={dateInputRef} type="date" name="today_date" onChange={handleChange} />
              </label>
            </p>
			
			
			
            <p>
              <button type="submit">Submit Form</button>
            </p>
            <input type="hidden" name="form-name" value="employment"></input>
          </form>
          <p dangerouslySetInnerHTML={{ __html: data.acf?.submit_message || '' }} />
        </div>
      </div>
    </>
  );
};

export default Form;