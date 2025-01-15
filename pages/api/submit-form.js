import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

import * as Templates from '@/app/lib/emailTemplates';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract data from the request body
        const data = req.body;
        let emailContent, emailSubject, emailManagerContent, emailManagerSubject;
        let emailTo = data.email;

        if (data.form == 'feedback') {
            emailContent = Templates.feedbackThankYouEmail(data);
            emailSubject = Templates.feedbackThankYouSubject();
            emailManagerContent = Templates.feedbackManagerEmail(data);
            emailManagerSubject = Templates.feedbackManagerSubject();
        } else if (data.form == 'catering') {
            emailContent = Templates.cateringThankYouEmail(data);
            emailSubject = Templates.cateringThankYouSubject();
            emailManagerContent = Templates.cateringManagerEmail(data);
            emailManagerSubject = Templates.cateringManagerSubject();
        } else {
            emailContent = Templates.signupEmail(data);
            emailSubject = Templates.signupSubject();
            emailTo = 'us@sarpinos-usa.com';
        }
        
        try {
            //   Send the emails
            await sendgrid.send({
                to: emailTo,
                from: process.env.SENDGRID_SENDER_EMAIL,
                subject: emailSubject,
                text: emailContent,
                html: emailContent.replace(/\n/g, "<br>")
            });

            if (data.form != 'signup') {
                await sendgrid.send({
                    to: data.managers_email,
                    from: process.env.SENDGRID_SENDER_EMAIL,
                    subject: emailManagerSubject,
                    text: emailManagerContent,
                    html: emailManagerContent.replace(/\n/g, "<br>")
                });
            }
        
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            if (error.response) {
                // The response error structure
                console.error('Error response received from SendGrid:');
                console.error('Status Code:', error.response.statusCode);
                console.error('Body:', error.response.body);
            } else {
                // General errors
                console.error('SendGrid error:', error.message);
            }

            res.status(500).json({
                success: false,
                message: 'Error sending email',
                body: error.response.body
            });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}