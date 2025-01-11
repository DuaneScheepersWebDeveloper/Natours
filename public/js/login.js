/*eslint-disable*/
// import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const login = async (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
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
      if(res.data.status === 'success'){
        alert(`Username: ${email}\nPassword: ${password}`);
        window.setTimeout(()=>{
          location.assign('/');
        }, 1500);
      }
      
    } catch (err) {
      // Check if the error object has a response property before accessing data
      if (err.response) {
        alert(err.response.data.message);
        console.log('Error Response Data:', err.response.data);
      } else {
        console.log('Error:', err.message); // Log the error message if no response
      }
    }
  };

  document.querySelector('.form.form--login').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submit event triggered');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Display alert with username and password


    login(email, password);
  });
});
