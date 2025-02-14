document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to show connections
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            // Add highlight class to connected steps
            highlightConnectedSteps(step);
        });
        
        step.addEventListener('mouseleave', function() {
            // Remove all highlights
            removeAllHighlights();
        });
    });
    
    function highlightConnectedSteps(step) {
        // Add logic here to highlight connected steps based on the flow
        const container = step.closest('.step-container');
        const level = container.parentElement;
        
        // Highlight next level steps
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
            if (step.classList.contains('good')) {
                step.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            } else if (step.classList.contains('bad')) {
                step.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            } else {
                step.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            }
            step.style.boxShadow = 'none';
        });
    }
});