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
            name: "Diaz",
            fullName: "IJ Diaz",
            location: "El Paso",
            master: "NO",
            individual: "Look at case notice",
            notice: "Look at case notice",
            copyText: "For Judge Diaz in El Paso:\nMaster Motion: NO\nIndividual Motion: Please check the case notice for specific requirements."
        },
    ];
    
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
            noticeText.classList.remove('hidden');
        } else {
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
    
    // Copy to clipboard functionality
    copyButton.addEventListener('click', function() {
        const textToCopy = copyText.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Show temporary success message
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        } else {
            // Fallback for browsers that don't support clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show temporary success message
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        }
    });
});