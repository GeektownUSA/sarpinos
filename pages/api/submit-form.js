import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

import * as Templates from '@/app/lib/emailTemplates';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract data from the request body
        const data = req.body;
        let emailContent, emailSubject, emailManagerContent, emailManagerSubject;
        let emailTo = '';

        if (data.form == 'feedback') {
            emailContent = Templates.feedbackThankYouEmail(data);
            emailSubject = Templates.feedbackThankYouSubject();
            emailManagerContent = Templates.feedbackManagerEmail(data);
            emailManagerSubject = Templates.feedbackManagerSubject();
			emailTo = data.email;
        } else if (data.form == 'catering') {
            emailContent = Templates.cateringThankYouEmail(data);
            emailSubject = Templates.cateringThankYouSubject();
            emailManagerContent = Templates.cateringManagerEmail(data);
            emailManagerSubject = Templates.cateringManagerSubject();
			emailTo = data.email;
        } else if (data.form == 'contact') {
            emailContent = Templates.contactThankYouEmail(data);
            emailSubject = Templates.contactThankYouSubject();
            emailManagerContent = Templates.contactManagerEmail(data);
            emailManagerSubject = Templates.contactManagerSubject();
			emailTo = data.email;
        } else if (data.form == 'employment') {
            emailContent = Templates.employmentThankYouEmail(data);
            emailSubject = Templates.employmentThankYouSubject();
            emailManagerContent = Templates.employmentManagerEmail(data);
            emailManagerSubject = Templates.employmentManagerSubject();
			emailTo = '';
			if (data.store == 'northmiamibeach') {
				emailTo = '3055390095@sarpinos-usa.com';
			}else if (data.store == 'miami-downtown'){
				emailTo = 'martinguzmanmiami@gmail.com';
			}else if (data.store == 'Pompano-Beach'){
				emailTo = '9548903330@sarpinos-usa.com';
			}else if (data.store == 'Westminster'){
				emailTo = 'westminstersarpinos@gmail.com';
			}else if (data.store == 'Wrigleyville'){
				emailTo = '7732811800@sarpinos-usa.com';
			}else if (data.store == 'Westport'){
				emailTo = '8169318600@sarpinos-usa.com';
			}else if (data.store == 'West-St-Paul'){
				emailTo = '6514520088@sarpinos-usa.com';
			}else if (data.store == 'West-Loop'){
				emailTo = '3122071777@sarpinos-usa.com';
			}else if (data.store == 'Vivion'){
				emailTo = '8164523333@sarpinos-usa.com';
			}else if (data.store == 'South-Leawood'){
				emailTo = '9132767170@sarpinos-usa.com';
			}else if (data.store == 'Shawnee'){
				emailTo = '9132135300@sarpinos-usa.com';
			}else if (data.store == 'Roseville'){
				emailTo = '6513799399@sarpinos-usa.com';
			}else if (data.store == 'Riverwoods'){
				emailTo = '8474191100@sarpinos-usa.com';
			}else if (data.store == 'Richfield'){
				emailTo = '6123554444@sarpinos-usa.com';
			}else if (data.store == 'Palatine'){
				emailTo = '8477762525@sarpinos-usa.com';
			}else if (data.store == 'Overland-Park'){
				emailTo = '9138648500@sarpinos-usa.com';
			}else if (data.store == 'Otsego'){
				emailTo = '7634416200@sarpinos-usa.com';
			}else if (data.store == 'Olathe'){
				emailTo = '9133618646@sarpinos-usa.com';
			}else if (data.store == 'Oakdale'){
				emailTo = '6515012020@sarpinos-usa.com';
			}else if (data.store == 'Northbrook'){
				emailTo = '8474005400@sarpinos-usa.com';
			}else if (data.store == 'North-Leawood'){
				emailTo = '9133818888@sarpinos-usa.com';
			}else if (data.store == 'New-Hope'){
				emailTo = '7637467990@sarpinos-usa.com';
			}else if (data.store == 'Naperville'){
				emailTo = '6307788808@sarpinos-usa.com';
			}else if (data.store == 'Miramar'){
				emailTo = '9544413838@sarpinos-usa.com';
			}else if (data.store == 'Lincoln-Park'){
				emailTo = '7735255050@sarpinos-usa.com';
			}else if (data.store == 'Lees-Summit'){
				emailTo = '8165544884@sarpinos-usa.com';
			}else if (data.store == 'La-Grange'){
				emailTo = '7083542100@sarpinos-usa.com';
			}else if (data.store == 'Independence'){
				emailTo = '8165812000@sarpinos-usa.com';
			}else if (data.store == 'Harwood-Heights'){
				emailTo = '7088679900@sarpinos-usa.com';
			}else if (data.store == 'Glen-Ellyn'){
				emailTo = 'us@sarpinos-usa.com';
			}else if (data.store == 'fort-lauderdale'){
				emailTo = '9545250515@sarpinos-usa.com';
			}else if (data.store == 'Evanston'){
				emailTo = '8478695555@sarpinos-usa.com';
			}else if (data.store == 'Elmhurst'){
				emailTo = '6302792900@sarpinos-usa.com';
			}else if (data.store == 'Eagan'){
				emailTo = '6514520005@sarpinos-usa.com';
			}else if (data.store == 'Downtown-Minneapolis'){
				emailTo = '6124558385@sarpinos-usa.com';
			}else if (data.store == 'Atlanta'){
				emailTo = '4047454555@sarpinos-usa.com';
			}else if (data.store == 'Downers-Grove'){
				emailTo = '6305150005@sarpinos-usa.com';
			}else if (data.store == 'Coral-Springs'){
				emailTo = '9549068880@sarpinos-usa.com';
			}else if (data.store == 'Clive'){
				emailTo = '5159871414@sarpinos-usa.com';
			}else if (data.store == 'Chaska'){
				emailTo = '9524485432@sarpinos-usa.com';
			}else if (data.store == 'Bucktown'){
				emailTo = '7732767777@sarpinos-usa.com';
			}else if (data.store == 'Braeswood'){
				emailTo = '7136671212@sarpinos-usa.com';
			}else if (data.store == 'Bloomingdale'){
				emailTo = '6309244444@sarpinos-usa.com';
			}else if (data.store == 'Albany-Park'){
				emailTo = '7732051111@sarpinos-usa.com';
			}else{
				emailTo = 'us@sarpinos-usa.com';
			}
        }else {
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