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
    signupSubject,
    signupEmail,
};