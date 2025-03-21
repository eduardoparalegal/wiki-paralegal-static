document.addEventListener('DOMContentLoaded', function() {
    // Judge data
    const judges = [
        {
            name: "Allen",
            fullName: "IJ Allen",
            location: "El Paso",
            master: "NO",
            individual: "YES",
            notice: null,
            copyText: "IJ Allen From El Paso no need motion"
        },
        {
            name: "Bonilla",
            fullName: "IJ Bonilla",
            location: "El Paso",
            master: "NO",
            individual: "YES",
            notice: null,
            copyText: "For Judge Bonilla in El Paso:\nMaster Motion: NO\nIndividual Motion: YES"
        },
        {
            name: "Diaz",
            fullName: "IJ Diaz",
            location: "El Paso",
            master: "NO",
            individual: "Look at case notice",
            notice: "Look at case notice",
            copyText: "For Judge Diaz in El Paso:\nMaster Motion: NO\nIndividual Motion: Please check the case notice for specific requirements."
        },
        {
            name: "Fernandez",
            fullName: "IJ Fernandez",
            location: "El Paso",
            master: "NO",
            individual: "NEVER",
            notice: null,
            copyText: "For Judge Fernandez in El Paso:\nMaster Motion: NO\nIndividual Motion: NEVER"
        }
    ];
    
    // Remove duplicate entries (the original data had Diaz repeated three times)
    
    // DOM Elements
    const searchInput = document.getElementById('judgeSearch');
    const searchButton = document.getElementById('searchButton');
    const resultContainer = document.getElementById('resultContainer');
    const noResultContainer = document.getElementById('noResultContainer');
    const judgeName = document.getElementById('judgeName');
    const locationText = document.getElementById('locationText');
    const masterResult = document.getElementById('masterResult');
    const individualResult = document.getElementById('individualResult');
    const noticeContainer = document.getElementById('noticeContainer');
    const noticeText = document.getElementById('noticeText');
    const copyText = document.getElementById('copyText');
    const copyButton = document.getElementById('copyButton');
    
    // Add focus to search input on page load
    searchInput.focus();
    
    // Search function
    function searchJudge() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            resultContainer.classList.add('hidden');
            noResultContainer.classList.add('hidden');
            return;
        }
        
        const foundJudge = judges.find(judge => 
            judge.name.toLowerCase().includes(searchTerm) || 
            judge.fullName.toLowerCase().includes(searchTerm)
        );
        
        if (foundJudge) {
            displayJudgeInfo(foundJudge);
            resultContainer.classList.remove('hidden');
            noResultContainer.classList.add('hidden');
        } else {
            resultContainer.classList.add('hidden');
            noResultContainer.classList.remove('hidden');
            
            // Auto focus back to search after no results
            setTimeout(() => {
                searchInput.focus();
                searchInput.select();
            }, 100);
        }
    }
    
    // Display judge information
    function displayJudgeInfo(judge) {
        judgeName.textContent = judge.fullName;
        locationText.textContent = judge.location;
        
        // Reset classes
        masterResult.className = 'cell';
        individualResult.className = 'cell';
        
        // Set master result
        masterResult.textContent = judge.master;
        if (judge.master === 'YES') {
            masterResult.classList.add('result-yes');
        } else if (judge.master === 'NO') {
            masterResult.classList.add('result-no');
        } else if (judge.master === 'NEVER') {
            masterResult.classList.add('result-never');
        }
        
        // Set individual result
        individualResult.textContent = judge.individual;
        if (judge.individual === 'YES') {
            individualResult.classList.add('result-yes');
        } else if (judge.individual === 'NO') {
            individualResult.classList.add('result-no');
        } else if (judge.individual === 'NEVER') {
            individualResult.classList.add('result-never');
        } else if (judge.individual === 'Look at case notice') {
            individualResult.classList.add('result-notice');
        }
        
        // Set notice text if applicable
        if (judge.notice) {
            noticeText.textContent = judge.notice;
            noticeContainer.classList.remove('hidden');
            noticeText.classList.remove('hidden');
        } else {
            noticeContainer.classList.add('hidden');
            noticeText.classList.add('hidden');
        }
        
        // Set copy text
        copyText.textContent = judge.copyText;
    }
    
    // Event listeners
    searchButton.addEventListener('click', searchJudge);
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchJudge();
        }
    });
    
    // Add animated feedback for button clicks
    searchButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.97)';
    });
    
    searchButton.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    searchButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Copy to clipboard functionality
    copyButton.addEventListener('click', function() {
        const textToCopy = copyText.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Show temporary success message with animation
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    copyButton.style.backgroundColor = '#10B981'; // Success green
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.style.backgroundColor = '#2d3748'; // Reset color
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    // Show error message
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Error!';
                    copyButton.style.backgroundColor = '#EF4444'; // Error red
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.style.backgroundColor = '#2d3748'; // Reset color
                    }, 2000);
                });
        } else {
            // Fallback for browsers that don't support clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                // Show success message
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.style.backgroundColor = '#10B981'; // Success green
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.style.backgroundColor = '#2d3748'; // Reset color
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                // Show error message
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Error!';
                copyButton.style.backgroundColor = '#EF4444'; // Error red
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.style.backgroundColor = '#2d3748'; // Reset color
                }, 2000);
            }
            
            document.body.removeChild(textarea);
        }
    });
});