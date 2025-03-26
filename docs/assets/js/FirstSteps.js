/**
 * FirstSteps.js - JavaScript para Wiki Paralegal
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const logoToggle = document.getElementById('logo-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const submenus = document.querySelectorAll('.has-submenu');
    
    // Función para alternar la visibilidad del sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        
        // Guardar estado del sidebar en localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }
    
    // Comprobar el estado guardado del sidebar
    function checkSavedSidebarState() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
        }
    }
    
    // Función para manejar el menú en dispositivos móviles
    function handleMobileMenu() {
        sidebar.classList.toggle('active');
        
        // Si el sidebar está colapsado, expandirlo
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
        }
    }
    
    // Función para manejar submenús
    function handleSubmenuToggle(event) {
        // Prevenir comportamiento por defecto del enlace
        event.preventDefault();
        
        // Obtener el elemento padre del submenú
        const submenuItem = event.currentTarget.closest('.has-submenu');
        
        // Cerrar todos los demás submenús
        submenus.forEach(menu => {
            if (menu !== submenuItem && !sidebar.classList.contains('collapsed')) {
                menu.classList.remove('open');
            }
        });
        
        // Si el sidebar está colapsado, expandirlo primero
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
            localStorage.setItem('sidebarCollapsed', false);
            
            // Añadir un pequeño retraso antes de abrir el submenú
            setTimeout(() => {
                submenuItem.classList.toggle('open');
            }, 300);
        } else {
            // Alternar el submenú actual
            submenuItem.classList.toggle('open');
        }
    }
    
    // Función para actualizar fecha y hora
    function updateDateTime() {
        const dateTimeElement = document.getElementById('current-datetime');
        if (dateTimeElement) {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit'
            };
            dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    
    // Función para manejar clics fuera del sidebar en dispositivos móviles
    function handleOutsideClick(event) {
        // Si el sidebar está activo y se hizo clic fuera de él
        if (
            sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            event.target !== menuToggle &&
            !menuToggle.contains(event.target)
        ) {
            sidebar.classList.remove('active');
        }
    }
    
    // Función para manejar hover en submenús en modo colapsado
    function setupSubmenuHoverBehavior() {
        submenus.forEach(submenu => {
            submenu.addEventListener('mouseenter', () => {
                if (sidebar.classList.contains('collapsed')) {
                    const submenuContent = submenu.querySelector('.submenu');
                    const submenuLink = submenu.querySelector('a');
                    
                    // Crear tooltip para mostrar el texto y submenú
                    const tooltip = document.createElement('div');
                    tooltip.classList.add('sidebar-tooltip');
                    
                    // Añadir el nombre del menú al tooltip
                    const menuName = document.createElement('div');
                    menuName.classList.add('tooltip-title');
                    menuName.textContent = submenuLink.querySelector('.nav-text').textContent;
                    tooltip.appendChild(menuName);
                    
                    // Posicionar el tooltip
                    const rect = submenu.getBoundingClientRect();
                    tooltip.style.left = (rect.right + 10) + 'px';
                    tooltip.style.top = rect.top + 'px';
                    
                    // Añadir el tooltip al body
                    document.body.appendChild(tooltip);
                    
                    // Guardar referencia al tooltip
                    submenu.tooltip = tooltip;
                }
            });
            
            submenu.addEventListener('mouseleave', () => {
                if (sidebar.classList.contains('collapsed') && submenu.tooltip) {
                    submenu.tooltip.remove();
                    submenu.tooltip = null;
                }
            });
        });
    }
    
    // Función para añadir transiciones suaves a las tarjetas
    function setupCardAnimations() {
        const cards = document.querySelectorAll('.mail-out-card, .update-card, .news-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }
    
    // Inicializar y agregar event listeners
    function init() {
        // Comprobar estado guardado del sidebar
        checkSavedSidebarState();
        
        // Event listeners
        logoToggle.addEventListener('click', toggleSidebar);
        menuToggle.addEventListener('click', handleMobileMenu);
        
        // Event listeners para submenús
        submenus.forEach(submenuItem => {
            const submenuLink = submenuItem.querySelector('a');
            submenuLink.addEventListener('click', handleSubmenuToggle);
        });
        
        // Event listener para clics fuera del sidebar
        document.addEventListener('click', handleOutsideClick);
        
        // Configurar comportamiento hover para submenús
        setupSubmenuHoverBehavior();
        
        // Configurar animaciones de tarjetas
        setupCardAnimations();
        
        // Configurar manejo táctil para dispositivos móviles
        setupTouchBehavior();
        
        // Asegurar que el menú hamburguesa funcione en móviles
        ensureMobileMenuWorks();
        
        // Actualizar fecha y hora
        updateDateTime();
        setInterval(updateDateTime, 60000); // Actualizar cada minuto
        
        // Event listener para el tamaño de la ventana
        window.addEventListener('resize', () => {
            // Si la ventana es mayor que 992px y el sidebar está en modo móvil
            if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
        
        // Inicializar tooltips y popovers si existen
        initializeTooltipsAndPopovers();
    }

    // Función para mejorar el soporte táctil en dispositivos móviles
    function setupTouchBehavior() {
        // Variables para detectar deslizamiento
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Detectar inicio de toque
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        // Detectar fin de toque
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        // Manejar deslizamiento
        function handleSwipe() {
            // Umbral de deslizamiento (en píxeles)
            const swipeThreshold = 100;
            
            // Deslizamiento de izquierda a derecha cerca del borde izquierdo
            if (touchEndX - touchStartX > swipeThreshold && touchStartX < 50) {
                if (!sidebar.classList.contains('active')) {
                    sidebar.classList.add('active');
                }
            }
            
            // Deslizamiento de derecha a izquierda con el sidebar abierto
            if (touchStartX - touchEndX > swipeThreshold && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    }
    
    // Asegurar que el botón de menú funcione en móviles
    function ensureMobileMenuWorks() {
        if (menuToggle) {
            // Eliminar cualquier evento anterior
            menuToggle.removeEventListener('click', handleMobileMenu);
            
            // Añadir evento de clic mejorado
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Activar el sidebar
                sidebar.classList.toggle('active');
                
                // Si el sidebar está colapsado, expandirlo
                if (sidebar.classList.contains('collapsed')) {
                    sidebar.classList.remove('collapsed');
                    localStorage.setItem('sidebarCollapsed', false);
                }
            });
        }
    }
    
    // Inicializar tooltips y popovers bootstrap si existen
    function initializeTooltipsAndPopovers() {
        // Verificar si Bootstrap está disponible
        if (typeof bootstrap !== 'undefined') {
            // Inicializar tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
            
            // Inicializar popovers
            const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        }
    }

    // Función para mejorar despliegue del menú en dispositivos móviles
    function enhanceMobileMenuVisibility() {
        // Obtener botón hamburguesa específico (las tres líneas junto a Welcome)
        const welcomeMenuToggle = document.querySelector('.header-menu-toggle');
        
        // Si existe, añadir evento de clic
        if (welcomeMenuToggle) {
            welcomeMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Desplegar el sidebar
                sidebar.classList.add('active');
                
                // Si está colapsado, expandirlo
                if (sidebar.classList.contains('collapsed')) {
                    sidebar.classList.remove('collapsed');
                    localStorage.setItem('sidebarCollapsed', false);
                }
            });
        }
    }

    // Iniciar todo
    init();
    
    // Añadir función para mejorar menú móvil
    enhanceMobileMenuVisibility();
});

// Enhanced menu toggle functionality
function enhanceMobileMenuToggle() {
    // Get all menu toggle buttons
    const allMenuToggles = document.querySelectorAll('.menu-toggle, .header-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    // Add event listener to all menu toggle buttons
    allMenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the sidebar active class
            sidebar.classList.toggle('active');
            
            // If the sidebar is collapsed, expand it
            if (sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
                localStorage.setItem('sidebarCollapsed', 'false');
            }
        });
    });
    
    // Close sidebar when clicking outside (enhanced version)
    document.addEventListener('click', function(e) {
        if (
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !Array.from(allMenuToggles).some(toggle => toggle.contains(e.target))
        ) {
            sidebar.classList.remove('active');
        }
    });
}

// Call this function in your init() or add it to document.addEventListener('DOMContentLoaded', ...)
// Add this line to your init() function:
enhanceMobileMenuToggle();

