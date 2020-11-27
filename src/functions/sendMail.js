import axios from 'axios';

export const sendMail = async (email, name) => {
  try {
    const res = await axios.get(`/api/sendmail/${email}/${name}`);
  } catch (error) {
    console.log('error occurred', error);
  }
};
