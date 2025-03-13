/**
 * videoMotionHome.js - JavaScript para la funcionalidad de la página inicial de VideoMotion
 */

// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const logoContainer = document.getElementById('logo-container');
    const docCategory = document.getElementById('documentation-category');
    const judgesCategory = document.getElementById('judges-category');
    const requestCategory = document.getElementById('request-category');
    
    // Función para alternar la barra lateral
    function toggleSidebarCollapse() {
        sidebar.classList.toggle('collapsed');
    }
    
    // Event Listeners
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    if (logoContainer) {
        logoContainer.addEventListener('click', toggleSidebarCollapse);
    }
    
    // Función para añadir efecto de hover a las tarjetas de categoría
    function setupCategoryCards() {
        const categoryCards = document.querySelectorAll('.vm-category');
        
        categoryCards.forEach(card => {
            // Efecto de hover avanzado
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.4)';
                
                // Encuentra el icono y lo anima
                const icon = this.querySelector('.vm-category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
                
                // Encuentra el fondo y lo anima
                const bg = this.querySelector('.vm-category-bg');
                if (bg) {
                    bg.style.transform = 'scale(1.1)';
                    bg.style.opacity = '0.4';
                }
                
                // Anima el ícono de flecha
                const arrow = this.querySelector('.vm-category-link i');
                if (arrow) {
                    arrow.style.transform = 'translateX(5px)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Restaura el icono
                const icon = this.querySelector('.vm-category-icon');
                if (icon) {
                    icon.style.transform = '';
                }
                
                // Restaura el fondo
                const bg = this.querySelector('.vm-category-bg');
                if (bg) {
                    bg.style.transform = '';
                    bg.style.opacity = '0.3';
                }
                
                // Restaura el ícono de flecha
                const arrow = this.querySelector('.vm-category-link i');
                if (arrow) {
                    arrow.style.transform = '';
                }
            });
            
            // Hacer que toda la tarjeta sea clickeable
            card.addEventListener('click', function(e) {
                // Solo navega si el clic no fue en el enlace (para evitar doble navegación)
                if (!e.target.closest('.vm-category-link')) {
                    const link = this.querySelector('.vm-category-link');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                }
            });
        });
    }
    
    // Inicializar efectos de categorías
    setupCategoryCards();
    
    // Función para detectar el tamaño de la pantalla y ajustar el sidebar
    function checkScreenSize() {
        if (window.innerWidth < 992) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('active');
        }
    }
    
    // Verificar el tamaño de la pantalla al cargar
    checkScreenSize();
    
    // Verificar el tamaño de la pantalla cuando cambia
    window.addEventListener('resize', checkScreenSize);
    
    // Implementación de notificaciones (simulación)
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('Notificaciones: No hay nuevas notificaciones.');
        });
    }
    
    // Implementación de búsqueda (simulación)
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Búsqueda: Función no implementada en esta demostración.');
                this.value = '';
            }
        });
    }
    
// Opción 3: Esquema moderno con tonos neutros
function setPlaceholderBackgrounds() {
    document.querySelectorAll('.documentation-bg').forEach(bg => {
        bg.style.backgroundImage = 'linear-gradient(135deg, #2c3e50, #34495e)';
    });
    
    document.querySelectorAll('.judges-bg').forEach(bg => {
        bg.style.backgroundImage = 'linear-gradient(135deg, #34495e, #415b76)';
    });
    
    document.querySelectorAll('.request-bg').forEach(bg => {
        bg.style.backgroundImage = 'linear-gradient(135deg, #415b76, #5d6d7e)';
    });
}
    
    // Inicializar fondos
    setPlaceholderBackgrounds();
});