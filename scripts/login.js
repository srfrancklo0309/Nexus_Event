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
    
    // Verifica si el usuario tiene permisos de administrador
    function isAdmin(username, users) {
        const user = users.find(user => user.username === username);
        
        if (user) {
            return user.admin;
        }
        return false;
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
                    if (isAdmin(usernameValue, users)) {
                        window.location.href = '../pages/dashboard.html';
                        sessionStorage.setItem('username',usernameValue);
                        sessionStorage.setItem('name',users.find(user => user.username === usernameValue).name)
                    } else {
                        window.location.href = '../index.html';
                        sessionStorage.setItem('username', usernameValue);
                        sessionStorage.setItem('name',users.find(user => user.username === usernameValue).name);
                    }
                }
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    });
});

