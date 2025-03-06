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
            event.target !== menuToggle
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
    
    // Función para inicializar tooltips y popovers
    function initializeTooltipsAndPopovers() {
        // Agregar tooltip a los botones de acción
        const actionButtons = document.querySelectorAll('.card-action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = 'More Options';
                
                const rect = button.getBoundingClientRect();
                tooltip.style.top = rect.bottom + 5 + 'px';
                tooltip.style.left = rect.left + (rect.width / 2) - 50 + 'px';
                
                document.body.appendChild(tooltip);
                button.tooltip = tooltip;
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(0)';
                }, 10);
            });
            
            button.addEventListener('mouseleave', () => {
                if (button.tooltip) {
                    button.tooltip.style.opacity = '0';
                    button.tooltip.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        button.tooltip.remove();
                        button.tooltip = null;
                    }, 300);
                }
            });
        });
    }
    
    // Inicializar la aplicación
    init();
});