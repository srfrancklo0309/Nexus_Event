const loginButton = document.getElementById('login-button');
const username = document.getElementById('username');
const password = document.getElementById('password');
const notificationToast = document.getElementById('notification-toast');

let users ={
    admin: {
        username: 'admin',
        password: 'admin'
    }
}

function validateLogin(username, password) {
    if (username === users.admin.username && password === users.admin.password) {
        return true;
    }
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

function isFieldEmpty() {
    if (username === '' || password === '') {
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
        return false;
    }
    return true;
}

loginButton.addEventListener('click', () => {
    const usernameValue = username.value;
    const passwordValue = password.value;

    if (isFieldEmpty() && validateLogin(usernameValue, passwordValue)) {
        window.location.href = '../pages/dashboard.html';
    }
});
