/*eslint-disable*/

import '@babel/polyfill';
import { login, logout } from './login';
import { updateUserData } from '../../controllers/viewsController';

// Select elements
const loginForm = document.querySelector('.form.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Submit event triggered');
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            console.log(`Email: ${email}, Password: ${password}`);
            login(email, password);
        });
    }
});

// Handle logout button click
if (logOutBtn) logOutBtn.addEventListener('click', logout);

// Handle user data form submission
if (userDataForm) {
    userDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        try {
            const res = await fetch('/submit-user-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });

            const data = await res.json();

            if (data.status === 'success') {
                alert('User data updated successfully!');
                location.reload();
            } else {
                alert('Failed to update user data');
            }
        } catch (err) {
            console.error('Error updating user data:', err);
            alert('Something went wrong. Please try again.');
        }
    });
}

// Handle password update form submission
if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent = 'Updating...';

        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;

        try {
            await updateUserData(
                { passwordCurrent, password, passwordConfirm },
                'password'
            );

            document.querySelector('.btn--save-password').textContent = 'Save password';
            document.getElementById('password-current').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
        } catch (err) {
            console.error('Error updating password:', err);
            document.querySelector('.btn--save-password').textContent = 'Save password';
        }
    });
}
