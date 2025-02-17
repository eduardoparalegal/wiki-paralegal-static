// Efecto de hover en los enlaces tipo botón
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Función para añadir un efecto de pulsación al hacer clic en las tarjetas
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Evitar que el clic se propague si es en el enlace-botón
        if (e.target.classList.contains('btn-primary') || e.target.tagName === 'A') {
            return;
        }
        
        // Obtener el enlace dentro de esta tarjeta
        const link = this.querySelector('.btn-primary');
        
        // Efecto visual de pulsación
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            // Redirigir a la página del enlace
            if (link && link.href) {
                window.location.href = link.href;
            }
        }, 150);
    });
});

// Cargar las tarjetas con un pequeño retraso para mejorar la experiencia
document.addEventListener('DOMContentLoaded', () => {
    const cardContainers = document.querySelectorAll('.card-container');
    
    // Establecer la opacidad inicial a 0 para asegurar la animación
    cardContainers.forEach(container => {
        container.style.opacity = '0';
    });
    
    // Añadir clase para activar la animación con un pequeño retraso
    setTimeout(() => {
        cardContainers.forEach((container, index) => {
            setTimeout(() => {
                container.style.opacity = '1';
            }, index * 200);
        });
    }, 300);
});