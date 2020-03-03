const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "miga02@migaweb.com",
        subject: "Thanks for joing in!",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`  	
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "miga02@migaweb.com",
        subject: "Sorry to see you go!",
        text: `Its been great to have you, ${name} as a customer. Hope we meet in future.`  	
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}