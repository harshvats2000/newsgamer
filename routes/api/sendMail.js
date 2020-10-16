const express = require('express');
var nodemailer = require('nodemailer');
const router = express.Router();

//@route   POST api/sendmail
//@desc    Send welcome email to user
router.post('/:email/:name', async (req, res) => {
  const name = req.params.name;
  const email = req.params.email;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vatsvatsharsh2000@gmail.com',
      pass: '9811370870',
    },
  });

  var mailOptions = {
    from: 'vatsvatsharsh2000@gmail.com',
    to: email,
    cc: 'vatsvatsharsh2000@gmail.com',
    subject: 'Welcome to NewsGamer',
    text: 'That was easy!',
    html: `
    <div style="background: aliceblue; padding: 15px">
        <h1>Hello, <span style="color: green">${name}</span> 👋.</h1>
        <div style="font-size: 18px;">
            <p>This is just a warm welcome to you by <span style="background: black; color: white; padding: 1px 5px;">Harsh Vats</span>, who is the person behind <span style="background: black; color: white; padding: 1px 5px;">News</span>Gamer.</p>
            <p>I hope you would definitely enjoy the game.</p>
        </div>
        <br/>
        <div style="font-size: 20px;">
            <div>Best Regards</div>
            <div>Harsh Vats</div>
        </div>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error, 'error at 25');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

module.exports = router;
