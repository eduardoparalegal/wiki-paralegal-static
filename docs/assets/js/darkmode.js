// docs/assets/js/darkmode.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    
    // Verificar si el sistema prefiere modo oscuro por defecto
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Comprobar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    let currentTheme;
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    }
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcons(currentTheme);
    
    // Función para actualizar los iconos según el tema
    function updateIcons(theme) {
        if (theme === 'dark') {
            // En modo oscuro: mostrar el sol (para cambiar a modo claro)
            themeIconLight.style.display = 'inline-block';
            themeIconDark.style.display = 'none';
        } else {
            // En modo claro: mostrar la luna (para cambiar a modo oscuro)
            themeIconLight.style.display = 'none';
            themeIconDark.style.display = 'inline-block';
        }
        
        // Actualizar clase del body
        document.body.classList.toggle('dark-mode', theme === 'dark');
    }
    
    // Evento para cambiar entre temas
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Cambiar tema
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Actualizar iconos
        updateIcons(newTheme);
        
        console.log('Theme changed to:', newTheme); // Para depuración
    });
});