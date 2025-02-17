// Initialize particles.js
document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#3dc2c3'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3dc2c3',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Select all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');

    // Add click event listener to each copy button
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // Find the closest code box and get its text content
            const codeBox = button.closest('.code-box');
            const codeText = codeBox.querySelector('pre code').textContent;

            try {
                // Copy text to clipboard
                await navigator.clipboard.writeText(codeText);
                
                // Update tooltip text
                const originalTooltip = button.getAttribute('data-tooltip');
                button.setAttribute('data-tooltip', 'Copied!');
                
                // Update icon
                const icon = button.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                // Add success animation class
                button.classList.add('copy-success');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.setAttribute('data-tooltip', originalTooltip);
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                    button.classList.remove('copy-success');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
                
                // Update tooltip for error
                button.setAttribute('data-tooltip', 'Failed to copy');
                
                // Update icon for error
                const icon = button.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-times');
                
                // Add error animation class
                button.classList.add('copy-error');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.setAttribute('data-tooltip', 'Copy to clipboard');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-copy');
                    button.classList.remove('copy-error');
                }, 2000);
            }
        });
    });

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.doc-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add initial styles and observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect for code boxes
    const codeBoxes = document.querySelectorAll('.code-box');
    codeBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.01)';
            box.style.boxShadow = '0 8px 30px rgba(61, 194, 195, 0.2)';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'scale(1)';
            box.style.boxShadow = 'none';
        });
    });
});