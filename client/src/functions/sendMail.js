import axios from 'axios';
import { baseurl } from '../constants';

export const sendMail = async (email, name) => {
  try {
    const res = await axios.post(`${baseurl()}/api/sendmail/${email}/${name}`);
  } catch (error) {
    console.log('error occurred', error);
  }
};
