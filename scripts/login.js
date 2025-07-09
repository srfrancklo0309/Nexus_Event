import { getUsers } from '../api/userAPI.js';

import { loadToastNotifications } from './bulma.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const { createToast, showToast } = loadToastNotifications();

    createToast();
    
    // Valida las credenciales del usuario
    function validateLogin(users, username, password) {
        const user = users.find(user => 
            user.username === username && user.password === password
        );
        
        if (user) {
            return true;
        } else {
            showToast("Error in login", "Invalid username or password");
            return false;
        }
    }
    
    // Verifica que los campos no estén vacíos
    function isFieldEmpty() {
        if (username.value === '' || password.value === '') {
            showToast("Error in login", "Please fill in all fields");
            return true;
        }
        return false;
    }
    
    loginButton.addEventListener('click', async () => {
        try {
            const { data: users } = await getUsers();
            
            const usernameValue = username.value;
            const passwordValue = password.value;

            if (!isFieldEmpty()) {
                if (validateLogin(users, usernameValue, passwordValue)) {
                    const user = users.find(user => user.username === usernameValue);
                    const userObj = {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        admin: user.admin
                    };
                    localStorage.setItem('user', JSON.stringify(userObj));
                    if (user.admin) {
                        window.location.href = '../pages/dashboard.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                }
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    });
});

