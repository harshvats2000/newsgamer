const functions = require('firebase-functions');
// const nodemailer = require('nodemailer');

// const transport = nodemailer.createTransport({
//   service: 'Gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     user: 'vatsvatsharsh2000@gmail.com',
//     pass: '9811370870',
//   },
//   name: 'vatsvatsharsh2000@gmail.com',
// });

exports.deleteInactiveGames = functions.firestore
  .document('games/{gameid}')
  .onCreate((doc) => {
    if (doc.data()) {
      setTimeout(() => {
        return doc.ref.delete();
      }, 300000);
    } else {
      return null;
    }
  });

// exports.welcomeEmail = functions.firestore.document('users/{email}').onCreate((doc) => {
//   const name = doc.data().name;
//   const email = doc.data().email;
//   return sendWelcomeEmail(email, name);
// });

// function sendWelcomeEmail(email, name) {
//   return transport
//     .sendMail({
//       from: 'vatsvatsharsh2000@gmail.com',
//       to: email,
//       subject: 'Hello from NewsGamer',
//       html: `
//       <h1>Hello ${name}</h1>.
//       <p>Just a warm welcome to you by Harsh Vats (creator of NewsGamer).</p>
//     `,
//     })
//     .then((r) => r)
//     .catch((r) => r);
// }
