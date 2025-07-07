import { getUsers } from '../api/userAPI.js';

const loginButton = document.getElementById('login-button');
const username = document.getElementById('username');
const password = document.getElementById('password');
const notificationToast = document.getElementById('notification-toast');

function validateLogin(users, username, password) {

    const user = users.find(user => 
        user.username === username && user.password === password
    );
    
    if (user) {
        return true;
    } else {
        notificationToast.innerHTML = `
            <div class="notification-header">
                <h4 class="notification-title">Error in login</h4>
                <button class="notification-close">&times;</button>
            </div>
            <p class="notification-message">Invalid username or password</p>
        `;
        notificationToast.style.display = 'block';
        setTimeout(() => {
            notificationToast.style.display = 'none';
        }, 3000);
        return false;
    }
}

function isAdmin(username, users) {
    const user = users.find(user => user.username === username);
    
    if (user) {
        return user.admin;
    }
    return false;
}

function isFieldEmpty() {
    if (username.value === '' || password.value === '') {
        notificationToast.innerHTML = `
            <div class="notification-header">
                <h4 class="notification-title">Error in login</h4>
                <button class="notification-close">&times;</button>
            </div>
            <p class="notification-message">Please fill in all fields</p>
        `;
        notificationToast.style.display = 'block';
        setTimeout(() => {
            notificationToast.style.display = 'none';
        }, 3000);
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
                } else {
                    console.log('Usuario no es admin, redirigiendo a events...');
                    window.location.href = '../index.html';
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
