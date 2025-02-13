// docs/assets/js/login.js
document.addEventListener('DOMContentLoaded', function() {
    // Usuario y contraseñas definidos
    const users = [
        { username: 'eduardoparalegal@gmail.com', password: 'clave123' },
        { username: 'davinaparalegal@gmail.com', password: 'clave456' },
        { username: 'danielparalegal@gmail.com', password: 'clave789' },
        { username: 'paralegal@gmail.com', password: 'clave012' }
    ];

    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    loginForm.appendChild(errorDiv);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            errorDiv.textContent = 'Please fill in all fields';
            return;
        }

        const user = users.find(u => 
            u.username.toLowerCase() === username.toLowerCase() && 
            u.password === password
        );
        
        if (user) {
            errorDiv.textContent = '';
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            window.location.href = 'home.html';
        } else {
            errorDiv.textContent = 'Incorrect username or password';
            document.getElementById('password').value = '';
            return false;
        }
    });

    document.getElementById('username').addEventListener('input', function() {
        errorDiv.textContent = '';
    });
    
    document.getElementById('password').addEventListener('input', function() {
        errorDiv.textContent = '';
    });
});