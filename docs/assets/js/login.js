// docs/assets/js/login.js
document.addEventListener('DOMContentLoaded', function() {
    // Usuario y contraseñas definidos
    const users = [
        { username: 'eduardoparalegal@gmail.com', password: 'bNviq8nEcc' },
        { username: 'davinaparalegal@gmail.com', password: 'xUqf85i6ks' },
        { username: 'danielparalegal@gmail.com', password: 'R9x9HrRTQL' },
        { username: 'adminparalegal@gmail.com', password: 'L4JQw9ExCl' },
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
            errorDiv.textContent = 'Por favor, completa todos los campos';
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
            // Guardar el tema actual para mantenerlo en la siguiente página
            const currentTheme = document.documentElement.getAttribute('data-theme');
            localStorage.setItem('theme', currentTheme || 'light');
            window.location.href = 'templates/FirstSteps.html';
        } else {
            errorDiv.textContent = 'Usuario o contraseña incorrectos';
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