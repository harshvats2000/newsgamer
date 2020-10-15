import axios from 'axios';

export const sendMail = async (email, name) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/sendmail/${email}/${name}`,
      (res, error) => {
        if (error) {
          console.log('could not sent successfully.');
        } else {
          console.log('email sent successfully.', error);
        }
      }
    );
  } catch (error) {
    console.log('error occurred', error);
  }
};
