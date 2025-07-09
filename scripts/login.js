import { getUsers } from '../api/userAPI.js';

import { loadToastNotifications } from './bulma.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const { createToast, showToast } = loadToastNotifications();

    createToast();
    
    function validateLogin(users, username, password) {
        console.log('Validando con datos:', { username, password });
        console.log('Usuarios disponibles:', users);
    
        const user = users.find(user => 
            user.username === username && user.password === password
        );
        
        console.log('Usuario encontrado:', user);
        
        if (user) {
            return true;
        } else {
            showToast("Error in login", "Invalid username or password");
            return false;
        }
    }
    
    function isAdmin(username, users) {
        console.log('Verificando si es admin:', { username });
        const user = users.find(user => user.username === username);
        
        console.log('Usuario para verificar admin:', user);
        
        if (user) {
            console.log('Es admin:', user.admin);
            return user.admin;
        }
        return false;
    }
    
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
            
            console.log('Usuarios cargados:', users);
            
            const usernameValue = username.value;
            const passwordValue = password.value;
            console.log('Credenciales ingresadas:', { username: usernameValue, password: passwordValue });
    
            if (!isFieldEmpty()) {
                console.log('Campos no están vacíos, validando credenciales...');
                
                if (validateLogin(users, usernameValue, passwordValue)) {
                    console.log('Credenciales válidas, verificando si es admin...');
                    
                    if (isAdmin(usernameValue, users)) {
                        console.log('Usuario es admin, redirigiendo a dashboard...');
                        window.location.href = '../pages/dashboard.html';
                        sessionStorage.setItem('username',usernameValue);
                        sessionStorage.setItem('name',users.find(user => user.username === usernameValue).name)
                    } else {
                        console.log('Usuario no es admin, redirigiendo a events...');
                        window.location.href = '../index.html';
                        sessionStorage.setItem('username', usernameValue);
                        sessionStorage.setItem('name',users.find(user => user.username === usernameValue).name);
                    }
                } else {
                    console.log('Credenciales inválidas');
                }
            } else {
                console.log('Campos están vacíos');
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    });
});

