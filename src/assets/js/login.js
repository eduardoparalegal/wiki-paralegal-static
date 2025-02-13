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
        
        // Obtener valores del formulario
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Validar que los campos no estén vacíos
        if (!username || !password) {
            errorDiv.textContent = 'Please fill in all fields';
            return;
        }

        // Buscar usuario
        const user = users.find(u => 
            u.username.toLowerCase() === username.toLowerCase() && 
            u.password === password
        );
        
        if (user) {
            // Limpiar cualquier mensaje de error previo
            errorDiv.textContent = '';
            
            // Guardar información de sesión
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
            // Redirigir a home
            window.location.href = 'home.html';
        } else {
            // Mostrar mensaje de error
            errorDiv.textContent = 'Incorrect username or password';
            
            // Limpiar el campo de contraseña
            document.getElementById('password').value = '';
            
            // Prevenir la redirección
            return false;
        }
    });

    // Limpiar mensajes de error cuando el usuario comienza a escribir
    document.getElementById('username').addEventListener('input', function() {
        errorDiv.textContent = '';
    });
    
    document.getElementById('password').addEventListener('input', function() {
        errorDiv.textContent = '';
    });
});