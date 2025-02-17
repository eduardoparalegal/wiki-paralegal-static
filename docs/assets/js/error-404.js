document.addEventListener('DOMContentLoaded', function() {
    // Prevent form submission
    const searchForm = document.querySelector('#search form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    // Function to handle responsive sizing
    function adjustSizes() {
        const wordsearch = document.getElementById('wordsearch');
        const liElements = document.querySelectorAll('#wordsearch ul li');
        
        if (wordsearch && liElements.length > 0) {
            // Get the computed width of the first li element
            const firstLi = liElements[0];
            const liWidth = getComputedStyle(firstLi).width;
            
            // Apply the width as height to maintain square aspect ratio
            liElements.forEach(li => {
                li.style.height = liWidth;
                li.style.lineHeight = liWidth;
            });
        }
    }

    // Initial size adjustment
    adjustSizes();

    // Adjust sizes on window resize
    window.addEventListener('resize', adjustSizes);

    // Animation sequence for highlighting letters
    const animationSequence = [
        'zero', 'one', 'two',           // 503
        'three', 'four', 'five', 'six', // PAGE
        'seven', 'eight', 'nine', 'ten', 'eleven', // UNDER
        'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen' // UPDATE
    ];

    // Function to animate a single letter
    function animateLetter(index) {
        if (index >= animationSequence.length) return;
        
        const element = document.querySelector(`.${animationSequence[index]}`);
        if (element) {
            element.classList.add('selected');
            setTimeout(() => animateLetter(index + 1), 200);
        }
    }

    // Start the animation sequence after a short delay
    setTimeout(() => animateLetter(0), 1000);
});