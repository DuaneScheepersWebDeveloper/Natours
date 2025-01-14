/*eslint-disable*/

import '@babel/polyfill';
import { login,logout } from './login';



const loginForm = document.querySelector('.form.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');

document.addEventListener('DOMContentLoaded', () => {
    if (loginForm)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Submit event triggered');
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        console.log(`Email: ${email}, Password: ${password}`);
        login(email, password);
    });
    });

    if(logOutBtn) logOutBtn.addEventListener('click', logout)

