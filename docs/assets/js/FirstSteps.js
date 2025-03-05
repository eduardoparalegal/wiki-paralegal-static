// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const logoToggle = document.getElementById('logo-toggle');
    const submenus = document.querySelectorAll('.has-submenu');

    // Función para alternar la visibilidad del sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
    }

    // Evento de clic en el logo para contraer/expandir sidebar
    logoToggle.addEventListener('click', toggleSidebar);

    // Función para manejar submenús
    function handleSubmenuToggle(event) {
        // Prevenir comportamiento por defecto del enlace
        event.preventDefault();

        // Obtener el elemento padre del submenú
        const submenuItem = event.currentTarget.closest('.has-submenu');

        // Cerrar todos los demás submenús
        submenus.forEach(menu => {
            if (menu !== submenuItem) {
                menu.classList.remove('open');
            }
        });

        // Alternar el submenú actual
        submenuItem.classList.toggle('open');
    }

    // Agregar eventos de clic a los elementos con submenú
    submenus.forEach(submenuItem => {
        const submenuLink = submenuItem.querySelector('a');
        submenuLink.addEventListener('click', handleSubmenuToggle);
    });

    // Función para actualizar fecha y hora
    function updateDateTime() {
        const dateTimeElement = document.getElementById('current-datetime');
        if (dateTimeElement) {
            const now = new Date();
            dateTimeElement.textContent = now.toLocaleString();
        }
    }

    // Actualizar fecha y hora cada segundo
    setInterval(updateDateTime, 1000);
    
    // Llamada inicial para mostrar fecha y hora
    updateDateTime();
});