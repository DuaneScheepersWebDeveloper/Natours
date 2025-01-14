/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

const login = async (email, password) => {
  console.log(`Email: ${email}, Password: ${password}`);
  console.log('login');
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log('Response:', res); // Log the whole response object
    if (res.data.status === 'success') {
      showAlert('sucess', 'Logged in sucessfully')
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // Check if the error object has a response property before accessing data
    if (err.response) {
      showAlert('error', err.response.data)
      console.log('Error Response Data:', err.response.data);
    } else {
      console.log('Error:', err.message); // Log the error message if no response
    }
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    console.log(err.response ? err.response.data : err.message); // Improved logging
    showAlert('error', 'Error logging out! Try again');
  }
};


// Export the login function
export { login,logout };
