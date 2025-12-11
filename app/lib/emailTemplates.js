const signupSubject = () => 'New Newsletter Signup!'
const signupEmail = (data) => `${data.email} as signed up for the newsletter!`

const cateringThankYouSubject = () => 'Thank You for Your Catering Request!'
const cateringManagerSubject = () => 'A Catering Request has been submitted!'

const cateringThankYouEmail = (data) =>  `Dear ${data.name},\n \n

Thank you for reaching out to us with your catering needs! We have successfully received your request form and our team is excited to assist in making your event a memorable one. \n

Here are the details you provided:\n

    •	Customers Name: ${data.name}\n
    •	Customers Phone: ${data.phone}\n
    •	Customers Email: ${data.email}\n
    •	Event Date: ${data.event_date}\n
    •	Location: ${data.event_address}, ${data.event_city}, ${data.event_state} ${data.event_zip}\n
    •	Your Store: ${data.store}\n
    •	How Can We Help: ${data.message}\n

Our catering coordinator will review your request and get back to you soon to confirm the details and discuss any further requirements or questions you may have.\n

In the meantime, if you need immediate assistance or have any urgent questions, please feel free to contact us at ${data.location_phone_number}.\n

Thank you for choosing Sarpino's Pizzeria! We look forward to helping you create a delicious and successful event.\n

Best regards,\n

Sarpino's Pizzeria\n
${data.store}`;

const cateringManagerEmail = (data) =>  `Dear Manager of ${data.store},\n \n

A user has submitted a request for catering. Details are below\n \n

    •	Customers Name: ${data.name}\n
    •	Customers Phone: ${data.phone}\n
    •	Customers Email: ${data.email}\n
    •	Event Date: ${data.event_date}\n
    •	Location: ${data.event_address}, ${data.event_city}, ${data.event_state} ${data.event_zip}\n
    •	How Can We Help: ${data.message}\n

Sarpino's Pizzeria`;

const contactThankYouSubject = () => 'Thank You for Contacting Us!'
const contactManagerSubject = () => 'A Contact Request has been submitted!'

const contactThankYouEmail = (data) =>  `Dear ${data.name},\n \n

"Thanks for contacting us! We'll get in touch with you shortly." \n

Here are the details you provided:\n

    •	Customers Name: ${data.name}\n
    •	Customers Phone: ${data.phone}\n
    •	Customers Email: ${data.email}\n
    •	Customer Request: ${data.request}\n
    •	Location: ${data.address}, ${data.address2}, ${data.city}, ${data.state} ${data.zip}\n
    •	Your Store: ${data.store}\n
    •	Comment/Request/Feedback: ${data.message}\n

In the meantime, if you need immediate assistance or have any urgent questions, please feel free to contact us at ${data.location_phone_number}.\n

Thank you for choosing Sarpino's Pizzeria! We look forward to helping you create a delicious and successful event.\n

Best regards,\n

Sarpino's Pizzeria\n
${data.store}`;

const contactManagerEmail = (data) =>  `Dear Manager of ${data.store},\n \n

A user has submitted a request for Contact. Details are below\n \n

    •	Customers Name: ${data.name}\n
    •	Customers Phone: ${data.phone}\n
    •	Customers Email: ${data.email}\n
    •	Customer Request: ${data.request}\n
    •	Location: ${data.address}, ${data.address2}, ${data.city}, ${data.state} ${data.zip}\n
    •	Comment/Request/Feedback: ${data.message}\n

Sarpino's Pizzeria`;


const employmentThankYouSubject = () => 'Thank You for Contacting Us!'
const employmentManagerSubject = () => 'A Employment Request has been submitted!'

const employmentThankYouEmail = (data) =>  `Dear ${data.first_name},\n \n

"Thanks for contacting us! We'll get in touch with you shortly." \n

Here are the details you provided:\n

    •	Date: ${data.cuurent_date}\n
    •	Full Name: ${data.first_name}, ${data.middle_name}, ${data.last_name}\n
    •	Present Address: ${data.present_address}, ${data.present_address2}, ${data.present_city}, ${data.present_state} ${data.present_zip}\n
    •	Is this also your Permanent Address?: ${data.address_confirmation}\n
	•	Permanent Address: ${data.permanent_address}, ${data.permanent_address2}, ${data.permanent_city}, ${data.permanent_state} ${data.permanent_zip}\n
    •	Phone: ${data.phone}\n
    •	Email: ${data.email}\n
    •	Are you 18 years of age or older?: ${data.age_confirmation}\n
    •	Date of Birth: ${data.date_of_birth}\n
    •	Are you legally able to work in the United States?: ${data.work_legally}\n
    •	Which store would you like to work at?: ${data.work_store}\n
    •	Position: ${data.position}\n
    •	Salary Desired: ${data.salary_desired}\n
    •	Date you can start: ${data.work_start_date}\n
    •	Are you employed now?: ${data.employed_now}\n
    •	May we inquire of your present employer?: ${data.present_employer}\n
    •	Have you ever applied to this company before?: ${data.applied_before}\n
    •	Where?: ${data.applied_before_location}\n
    •	When?: ${data.applied_before_time}\n
    •	Name of Most Recent Employer: ${data.most_recent_employer_name}\n
    •	Phone of Most Recent Employer: ${data.most_recent_employer_phone}\n
    •	Address of Most Recent Employer: ${data.most_recent_employer_address}, ${data.most_recent_employer_address2}, ${data.most_recent_employer_city}, ${data.most_recent_employer_state} ${data.most_recent_employer_zip}\n
	•	Position of Most Recent Employer: ${data.most_recent_position}\n
	•	Start Date of Most Recent Employer: ${data.first_employer_start_date}\n
	•	Leaving Date for Most Recent Employer: ${data.first_employer_leave_date}\n
	•	Name of Second Most Recent Employer: ${data.second_employer_name}\n
    •	Phone of Second Most Recent Employer: ${data.second_employer_phone}\n
    •	Address Second of Most Recent Employer: ${data.second_employer_address}, ${data.second_employer_address2}, ${data.second_employer_city}, ${data.second_employer_state} ${data.second_employer_zip}\n
	•	Position of Most Recent Employer: ${data.second_employer_position}\n
	•	Start Date of Most Recent Employer: ${data.second__employer_start_date}\n
	•	Leaving Date for Most Recent Employer: ${data.second_employer_leave_date}\n
	•	Reason for leaving for Second Most Recent Employer: ${data.second_leaving_reason}\n
	•	Name of Other Employer: ${data.other_employer_name}\n
    •	Phone of Other Employer: ${data.other_employer_phone}\n
    •	Address Other of Most Employer: ${data.other_employer_address}, ${data.other_employer_address2}, ${data.other_employer_city}, ${data.other_employer_state} ${data.other_employer_zip}\n
	•	Position of Other Employer: ${data.other_employer_position}\n
	•	Start Date of Other Employer: ${data.other_employer_start_date}\n
	•	Leaving Date for Other Employer: ${data.other_employer_leave_date}\n
	•	Reason for leaving for Other Employer: ${data.other_leaving_reason}\n
	•	Any periods of unemployment Start Date: ${data.start_date}\n
	•	Any periods of unemployment End Date: ${data.end_date}\n
	•	Any periods of unemployment Explaination: ${data.explanation}\n
	•	Reference Name: ${data.ref_name}\n
	•	Reference Address: ${data.ref_address}\n
	•	Reference Phone: ${data.ref_phone}\n
	•	Reference Years Acquainted: ${data.ref_years_acquainted}\n
	•	Are you applying to be a Delivery Driver?: ${data.delivery_drivers}\n
	•	Have you ever been convicted of a crime involving a motor vehicle, including vehicular homicide or assault? *: ${data.vehicle_assault}\n
	•	Explaination *: ${data.vehicle_assault_explaination}\n
	•	In the last 5 years, have you ever received a violation for DUI or open container/chemical test failure/possession of a controlled substance? *: ${data.violation}\n
	•	Explaination *: ${data.violation_explaination}\n
	•	Has your driver’s license ever been suspended or revoked? *: ${data.license_suspended}\n
	•	Explaination *: ${data.license_suspended_exlaination}\n
	•	Signature *: ${data.signature}\n
	•	Today's Date *: ${data.today_date}\n

In the meantime, if you need immediate assistance or have any urgent questions, please feel free to contact us at ${data.location_phone_number}.\n

Thank you for choosing Sarpino's Pizzeria! We look forward to helping you create a delicious and successful event.\n

Best regards,\n

Sarpino's Pizzeria\n
${data.work_store}`;

const employmentManagerEmail = (data) =>  `Dear Manager of ${data.work_store},\n \n

A user has submitted a request for Contact. Details are below\n \n

    •	Date: ${data.cuurent_date}\n
    •	Full Name: ${data.first_name}, ${data.middle_name}, ${data.last_name}\n
    •	Present Address: ${data.present_address}, ${data.present_address2}, ${data.present_city}, ${data.present_state} ${data.present_zip}\n
    •	Is this also your Permanent Address?: ${data.address_confirmation}\n
	•	Permanent Address: ${data.permanent_address}, ${data.permanent_address2}, ${data.permanent_city}, ${data.permanent_state} ${data.permanent_zip}\n
    •	Phone: ${data.phone}\n
    •	Email: ${data.email}\n
    •	Are you 18 years of age or older?: ${data.age_confirmation}\n
    •	Date of Birth: ${data.date_of_birth}\n
    •	Are you legally able to work in the United States?: ${data.work_legally}\n
    •	Which store would you like to work at?: ${data.work_store}\n
    •	Position: ${data.position}\n
    •	Salary Desired: ${data.salary_desired}\n
    •	Date you can start: ${data.work_start_date}\n
    •	Are you employed now?: ${data.employed_now}\n
    •	May we inquire of your present employer?: ${data.present_employer}\n
    •	Have you ever applied to this company before?: ${data.applied_before}\n
    •	Where?: ${data.applied_before_location}\n
    •	When?: ${data.applied_before_time}\n
    •	Name of Most Recent Employer: ${data.most_recent_employer_name}\n
    •	Phone of Most Recent Employer: ${data.most_recent_employer_phone}\n
    •	Address of Most Recent Employer: ${data.most_recent_employer_address}, ${data.most_recent_employer_address2}, ${data.most_recent_employer_city}, ${data.most_recent_employer_state} ${data.most_recent_employer_zip}\n
	•	Position of Most Recent Employer: ${data.most_recent_position}\n
	•	Start Date of Most Recent Employer: ${data.first_employer_start_date}\n
	•	Leaving Date for Most Recent Employer: ${data.first_employer_leave_date}\n
	•	Name of Second Most Recent Employer: ${data.second_employer_name}\n
    •	Phone of Second Most Recent Employer: ${data.second_employer_phone}\n
    •	Address Second of Most Recent Employer: ${data.second_employer_address}, ${data.second_employer_address2}, ${data.second_employer_city}, ${data.second_employer_state} ${data.second_employer_zip}\n
	•	Position of Most Recent Employer: ${data.second_employer_position}\n
	•	Start Date of Most Recent Employer: ${data.second__employer_start_date}\n
	•	Leaving Date for Most Recent Employer: ${data.second_employer_leave_date}\n
	•	Reason for leaving for Second Most Recent Employer: ${data.second_leaving_reason}\n
	•	Name of Other Employer: ${data.other_employer_name}\n
    •	Phone of Other Employer: ${data.other_employer_phone}\n
    •	Address Other of Most Employer: ${data.other_employer_address}, ${data.other_employer_address2}, ${data.other_employer_city}, ${data.other_employer_state} ${data.other_employer_zip}\n
	•	Position of Other Employer: ${data.other_employer_position}\n
	•	Start Date of Other Employer: ${data.other_employer_start_date}\n
	•	Leaving Date for Other Employer: ${data.other_employer_leave_date}\n
	•	Reason for leaving for Other Employer: ${data.other_leaving_reason}\n
	•	Any periods of unemployment Start Date: ${data.start_date}\n
	•	Any periods of unemployment End Date: ${data.end_date}\n
	•	Any periods of unemployment Explaination: ${data.explanation}\n
	•	Reference Name: ${data.ref_name}\n
	•	Reference Address: ${data.ref_address}\n
	•	Reference Phone: ${data.ref_phone}\n
	•	Reference Years Acquainted: ${data.ref_years_acquainted}\n
	•	Are you applying to be a Delivery Driver?: ${data.delivery_drivers}\n
	•	Have you ever been convicted of a crime involving a motor vehicle, including vehicular homicide or assault? *: ${data.vehicle_assault}\n
	•	Explaination *: ${data.vehicle_assault_explaination}\n
	•	In the last 5 years, have you ever received a violation for DUI or open container/chemical test failure/possession of a controlled substance? *: ${data.violation}\n
	•	Explaination *: ${data.violation_explaination}\n
	•	Has your driver’s license ever been suspended or revoked? *: ${data.license_suspended}\n
	•	Explaination *: ${data.license_suspended_exlaination}\n
	•	Signature *: ${data.signature}\n
	•	Today's Date *: ${data.today_date}\n

Sarpino's Pizzeria`;

const feedbackThankYouSubject = () => 'Thank You for Your Feedback'
const feedbackManagerSubject = () => 'A customer has submitted feedback'

const feedbackThankYouEmail = (data) =>  `Dear valued customer, \n \n

Thank you for taking the time to share your feedback with us. We sincerely appreciate your input and value your perspective. Your comments are crucial in helping us improve our products and services to better meet your needs. \n \n

Please be assured that our team is reviewing your feedback carefully. \n \n

Best regards,\n
${data.service_store}\n
Sarpino's Pizzeria`;

const feedbackManagerEmail = (data) =>  `Dear ${data.managers_name || 'manager'},\n \n

A customer has submitted the following feedback.\n \n

Satisfation: ${data.satisfation}\n
Message: ${data.message}\n
Date of Visit: ${data.service_date}\n \n

Customer's Phone: ${data.phone}\n
Customer's Email: ${data.email}\n \n

Sarpino's Pizzeria`;

export {
    feedbackThankYouSubject,
    feedbackThankYouEmail,
    feedbackManagerSubject,
    feedbackManagerEmail,
    cateringThankYouSubject,
    cateringThankYouEmail,
    cateringManagerSubject,
    cateringManagerEmail,
	contactThankYouSubject,
    contactThankYouEmail,
    contactManagerSubject,
    contactManagerEmail,
	employmentThankYouSubject,
    employmentThankYouEmail,
    employmentManagerSubject,
    employmentManagerEmail,
    signupSubject,
    signupEmail,
};