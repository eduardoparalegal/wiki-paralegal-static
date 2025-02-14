document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            highlightConnectedSteps(step);
        });
        
        step.addEventListener('mouseleave', function() {
            removeAllHighlights();
        });
    });
    
    function highlightConnectedSteps(step) {
        const container = step.closest('.step-container');
        const level = container.parentElement;
        
        const nextLevel = level.nextElementSibling;
        if (nextLevel) {
            nextLevel.querySelectorAll('.step').forEach(nextStep => {
                nextStep.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                nextStep.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.2)';
            });
        }
    }
    
    function removeAllHighlights() {
        steps.forEach(step => {
            step.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            step.style.boxShadow = 'none';
        });
    }
});