document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    
    // Configurar click en los cuadros para mostrar el siguiente nivel
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', function(e) {
            // Evitar que el clic en el botón "More" active esta función
            if (e.target.classList.contains('more-btn') || 
                e.target.classList.contains('status-message') || 
                e.target.parentElement.classList.contains('status-message')) {
                return;
            }
            
            const nextLevel = this.getAttribute('data-level');
            if (nextLevel) {
                // Ocultar todos los niveles siguientes primero
                const allLevels = document.querySelectorAll('[class*="paths-level-"]');
                allLevels.forEach(level => {
                    if (!level.classList.contains('paths-level-1')) {
                        level.classList.remove('visible');
                    }
                });
                
                // Mostrar el nivel específico
                const targetLevel = document.querySelector(`.paths-level-${nextLevel}`);
                if (targetLevel) {
                    targetLevel.classList.add('visible');
                }
            }
        });
    });
    
    // Configurar botones "More" para abrir el modal
    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se active el evento de clic del padre (step)
            
            // Obtener datos del botón
            const title = this.getAttribute('data-title');
            const imageUrl = this.getAttribute('data-image');
            const description = this.getAttribute('data-description');
            
            // Actualizar contenido del modal
            modalTitle.textContent = title;
            modalImage.src = imageUrl;
            modalImage.alt = title;
            modalDescription.textContent = description;
            
            // Mostrar el modal
            modal.style.display = 'block';
        });
    });
    
    // Cerrar modal al hacer clic en la X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});