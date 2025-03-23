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
            "name": "Braun",
            "fullName": "IJ Braun",
            "location": "Annandale",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Vanveldhuisen",
            "fullName": "IJ Vanveldhuisen",
            "location": "Annandale",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Welsh",
            "fullName": "IJ Welsh",
            "location": "Annandale",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Atlanta",
            "fullName": "Atlanta All Judges",
            "location": "Atlanta – Ted Turner",
            "master": "CHECK THE CASE NOTICE",
            "individual": "CHECK THE CASE NOTICE",
            "notice": "IF INTERNET – BOTH VIA WEBEX\nIF IN PERSON – FILE VM FOR ATTORNEY AND CLIENT IS IN PERSON",
            "copyText": "none"
        },
        {
            "name": "Boston",
            "fullName": "Boston All Judges",
            "location": "Boston",
            "master": "NO (Webex separately)",
            "individual": "NO (Webex separately)",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Chelmsford",
            "fullName": "Chelmsford All Judges",
            "location": "Chelmsford",
            "master": "NO (Webex separately)",
            "individual": "NO (Webex separately)",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Venci",
            "fullName": "IJ Venci",
            "location": "Chicago",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Riedthaler-Williams",
            "fullName": "IJ Riedthaler-Williams",
            "location": "Cleveland",
            "master": "NO (Webex separately) – FOR MASTER RESETS\nINITIAL MASTERS ARE IN PERSON",
            "individual": "NO (Webex separately)",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Price",
            "fullName": "IJ Price",
            "location": "Concord",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Star",
            "fullName": "IJ Star",
            "location": "Concord",
            "master": "YES",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Davis-Gumbs",
            "fullName": "IJ Davis-Gumbs",
            "location": "Dallas",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Dvorak",
            "fullName": "IJ Dvorak",
            "location": "Dallas",
            "master": "NO",
            "individual": "YES",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Ellison",
            "fullName": "IJ Ellison",
            "location": "Dallas",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Fluke",
            "fullName": "IJ Fluke",
            "location": "Dallas",
            "master": "INTERNET BASED (BOTH WEBEX)",
            "individual": "INTERNET BASED (BOTH WEBEX)",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Herrington",
            "fullName": "IJ Herrington",
            "location": "Dallas",
            "master": "NO",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Fluke",
            "fullName": "IJ Fluke",
            "location": "Dallas",
            "master": "INTERNET BASED (BOTH WEBEX)",
            "individual": "INTERNET BASED (BOTH WEBEX)",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Herrington",
            "fullName": "IJ Herrington",
            "location": "Dallas",
            "master": "NO",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Irwin",
            "fullName": "IJ Irwin",
            "location": "Dallas",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Martinez",
            "fullName": "IJ Martinez",
            "location": "Dallas",
            "master": "NO",
            "individual": "NO",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Naselow-Nahas",
            "fullName": "IJ Naselow-Nahas",
            "location": "Dallas",
            "master": "NO",
            "individual": "NO",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Nugent",
            "fullName": "IJ Nugent",
            "location": "Dallas",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Ozmun",
            "fullName": "IJ Ozmun",
            "location": "Dallas",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Sims",
            "fullName": "IJ Sims",
            "location": "Dallas",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Thielemann",
            "fullName": "IJ Thielemann",
            "location": "Dallas",
            "master": "NEVER",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Wood",
            "fullName": "IJ Wood",
            "location": "Denver",
            "master": "CHECK THE CASE NOTICE",
            "individual": "CHECK THE CASE NOTICE",
            "notice": "IF INTERNET – BOTH VIA WEBEX\n\nIF IN PERSON – FILE VM FOR ATTORNEY AND CLIENT IS IN PERSON",
            "copyText": "none"
        },
        {
            "name": "Allen",
            "fullName": "IJ Allen",
            "location": "El Paso",
            "master": "NO",
            "individual": "YES",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Bonilla",
            "fullName": "IJ Bonilla",
            "location": "El Paso",
            "master": "NO",
            "individual": "YES",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Diaz",
            "fullName": "IJ Diaz",
            "location": "El Paso",
            "master": "NO",
            "individual": "Look at case notice",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Fernandez",
            "fullName": "IJ Fernandez",
            "location": "El Paso",
            "master": "NO",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Hartnett",
            "fullName": "IJ Hartnett",
            "location": "El Paso",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Herbert",
            "fullName": "IJ Herbert",
            "location": "El Paso",
            "master": "YES if we get written consent by client waiving attorney’s physical presence in court\n\nIf no consent, then IN PERSON",
            "individual": "YES if we get written consent by client waiving attorney’s physical presence in court\n\nIf no consent, then IN PERSON",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Holguin",
            "fullName": "IJ Holguin",
            "location": "El Paso",
            "master": "NO",
            "individual": "YES",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Miller",
            "fullName": "IJ Miller",
            "location": "El Paso",
            "master": "NO (same room as attorney, if not appear in person)",
            "individual": "NEVER",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Paredes Velasco",
            "fullName": "IJ Paredes Velasco",
            "location": "El Paso",
            "master": "NO (can appear separately)",
            "individual": "NO",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Razo",
            "fullName": "IJ Razo",
            "location": "El Paso",
            "master": "NO",
            "individual": "YES",
            "notice": null,
            "copyText": "none"
        },
        {
            "name": "Tida",
            "fullName": "IJ Tida",
            "location": "El Paso",
            "master": "NO",
            "individual": "No Available",
            "notice": null,
            "copyText": "none"
        },
    {
        name: "Diaz",
        fullName: "IJ Diaz",
        location: "El Paso",
        master: "NO",
        individual: "Look at case notice",
        notice: "Look at case notice",
        copyText: "none"
    },
    {
        name: "Munson",
        fullName: "IJ Munson",
        location: "Hartford",
        master: "NO (can appear separately)",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Brown",
        fullName: "IJ Brown",
        location: "Houston",
        master: "NO (client separately)",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Jones",
        fullName: "IJ Jones",
        location: "Houston",
        master: "NEVER",
        individual: "NEVER",
        notice: "No Available",
        copyText: "none"
    },
    {
        name: "Phan",
        fullName: "IJ Phan",
        location: "Houston",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Caudillo",
        fullName: "IJ Caudillo",
        location: "Laredo",
        master: "NO",
        individual: "YES 15 days before merits hearing",
        notice: null,
        copyText: "none"
    },
    {
        name: "Figueroa",
        fullName: "IJ Figueroa",
        location: "Laredo",
        master: "NO",
        individual: "YES",
        notice: null,
        copyText: "none"
    },
    {
        name: "Baker",
        fullName: "IJ Baker",
        location: "Las Vegas",
        master: "NO",
        individual: "Yes",
        notice: null,
        copyText: "none"
    },
    {
        name: "Mcdermott",
        fullName: "IJ Mcdermott",
        location: "Las Vegas",
        master: "NO",
        individual: "NO",
        notice: null,
        copyText: "none"
    },
    {
        name: "Roberts",
        fullName: "IJ Roberts",
        location: "Las Vegas",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Desai",
        fullName: "IJ Desai",
        location: "Los Angeles",
        master: "NO – client and attorney via Webex",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Stancill",
        fullName: "IJ Stancill",
        location: "Los Angeles",
        master: "NO – client and attorney via Webex",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Marsteller",
        fullName: "IJ Marsteller",
        location: "New Orleans",
        master: "Yes, but only if filed 15 days before hearing date",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Burke",
        fullName: "IJ Burke",
        location: "Orlando",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Harris",
        fullName: "IJ Harris",
        location: "Orlando",
        master: "YES (Mention OpenConnect) – USE TELEPHONIC MOTION",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Lang",
        fullName: "IJ Lang",
        location: "Orlando",
        master: "No Available",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Alcorn",
        fullName: "IJ Alcorn",
        location: "Pearsall",
        master: "NO (Webex separately)",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "McKee",
        fullName: "IJ McKee",
        location: "Pearsall",
        master: "NO (Webex separately)",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Paulissen",
        fullName: "IJ Paulissen",
        location: "Pearsall",
        master: "NO (Webex separately)",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Adams",
        fullName: "IJ Adams",
        location: "San Antonio",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Anibal Martinez",
        fullName: "IJ Anibal Martinez",
        location: "San Antonio",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Burkhart",
        fullName: "IJ Burkhart",
        location: "San Antonio",
        master: "NO (for now)",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Elizabeth Martinez",
        fullName: "IJ Elizabeth Martinez",
        location: "San Antonio",
        master: "NO",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Canales",
        fullName: "IJ Canales",
        location: "San Antonio",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Crossan",
        fullName: "IJ Crossan",
        location: "San Antonio",
        master: "NO",
        individual: "YES",
        notice: null,
        copyText: "none"
    },
    {
        name: "Gonzalez",
        fullName: "IJ Gonzalez",
        location: "San Antonio",
        master: "NO",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Harlow",
        fullName: "IJ Harlow",
        location: "San Antonio",
        master: "NO (Webex separately)",
        individual: "YES",
        notice: null,
        copyText: "none"
    },
    {
        name: "Lafuente",
        fullName: "IJ Lafuente",
        location: "San Antonio",
        master: "NO",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Martin",
        fullName: "IJ Martin",
        location: "San Antonio",
        master: "No (same room as attorney)",
        individual: "No (same room as attorney)",
        notice: null,
        copyText: "none"
    },
    {
        name: "Mccullough",
        fullName: "IJ Mccullough",
        location: "San Antonio",
        master: "YES",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Newaz",
        fullName: "IJ Newaz",
        location: "San Antonio",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Santander",
        fullName: "IJ Santander",
        location: "San Antonio",
        master: "NO (same room as attorney)",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Tijerina",
        fullName: "IJ Tijerina",
        location: "San Antonio",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Tyrakoski",
        fullName: "IJ Tyrakoski",
        location: "San Antonio",
        master: "NO for client and attorney",
        individual: "MUST BE IN PERSON",
        notice: null,
        copyText: "none"
    },
    {
        name: "Chen",
        fullName: "IJ Chen",
        location: "San Francisco",
        master: "NO",
        individual: "NO",
        notice: null,
        copyText: "none"
    },
    {
        name: "Davis",
        fullName: "IJ Davis",
        location: "San Francisco",
        master: "NO (Client separately)",
        individual: "YES",
        notice: null,
        copyText: "none"
    },
    {
        name: "Dillon",
        fullName: "IJ Dillon",
        location: "San Francisco",
        master: "NO (Separately or with attorney)",
        individual: "YES",
        notice: null,
        copyText: "none"
    },
    {
        name: "George",
        fullName: "IJ George",
        location: "San Francisco",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Gordon",
        fullName: "IJ Gordon",
        location: "San Francisco",
        master: "NO",
        individual: "NO",
        notice: null,
        copyText: "none"
    },
    {
        name: "Nava",
        fullName: "IJ Nava",
        location: "San Francisco",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Slayton",
        fullName: "IJ Slayton",
        location: "San Francisco",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Star",
        fullName: "IJ Star",
        location: "San Francisco",
        master: "YES",
        individual: "NEVER",
        notice: "MESSAGE DENIS TO SEE IF WE GIVE THE CASE TO MARY OR JOHN\n\nIF JOHN: MESSAGE JOHN ON MESSENGER TO FILE HIS OWN VM:\n\nMESSENGER: JOHN LANE\n\nIF MARY:\nTEXT MARY TO FILE HER OWN VM\n\nNUMBER: 858-232-2450",
        copyText: "none"
    },
    {
        name: "Swink",
        fullName: "IJ Swink",
        location: "San Francisco",
        master: "YES",
        individual: "YES",
        notice: "USE THE VM NILOUFAR TEMPLATE AND EMAIL IT TO NILOUFAR\n\nEMAIL: Niloufar@Mazharilaw.com",
        copyText: "none"
    },
    {
        name: "McFadden",
        fullName: "IJ McFadden",
        location: "Santa Ana",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Fitting",
        fullName: "IJ Fitting",
        location: "Seattle",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Floyd",
        fullName: "IJ Floyd",
        location: "Seattle",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Johnson",
        fullName: "IJ Johnson",
        location: "Seattle",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Mcseveney",
        fullName: "IJ Mcseveney",
        location: "Seattle",
        master: "NO (Webex Separately)",
        individual: "Check case notice – sometimes yes file vm, sometimes no it's already internet-based (if internet, client Webex)",
        notice: null,
        copyText: "none"
    },
    {
        name: "Odell",
        fullName: "IJ Odell",
        location: "Seattle",
        master: "NO",
        individual: "No Available",
        notice: null,
        copyText: "none"
    },
    {
        name: "Parchert",
        fullName: "IJ Parchert",
        location: "Seattle",
        master: "YES (Mention OpenConnect) – USE TELEPHONIC MOTION",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    },
    {
        name: "Reyes",
        fullName: "IJ Reyes",
        location: "Seattle",
        master: "NO (Webex separately)",
        individual: "NO (Webex separately)",
        notice: null,
        copyText: "none"
    },
    {
        name: "Scala",
        fullName: "IJ Scala",
        location: "Seattle",
        master: "NO",
        individual: "YES",
        notice: null,
        copyText: "none"
    },
    {
        name: "Tisocco",
        fullName: "IJ Tisocco",
        location: "Seattle",
        master: "YES",
        individual: "NEVER",
        notice: "MESSAGE DENIS TO SEE IF WE GIVE THE CASE TO MARY OR JOHN\n\nIF JOHN: MESSAGE JOHN ON MESSENGER TO FILE HIS OWN VM:\n\nMESSENGER: JOHN LANE\n\nIF MARY:\nTEXT MARY TO FILE HER OWN VM\n\nNUMBER: 858-232-2450",
        copyText: "none"
    },
    {
        name: "Windrow",
        fullName: "IJ Windrow",
        location: "Seattle",
        master: "NEVER",
        individual: "NEVER",
        notice: null,
        copyText: "none"
    }
    ];
    
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIconLight.style.display = 'none';
            themeIconDark.style.display = 'block';
        } else {
            themeIconLight.style.display = 'block';
            themeIconDark.style.display = 'none';
        }
    }
    
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
        
        // Set master result and apply color based on text content
        masterResult.textContent = judge.master;
        masterResult.setAttribute('data-text', judge.master); // For CSS targeting
        applyTextColorClass(masterResult, judge.master);
        
        // Set individual result and apply color based on text content
        individualResult.textContent = judge.individual;
        individualResult.setAttribute('data-text', judge.individual); // For CSS targeting
        applyTextColorClass(individualResult, judge.individual);
        
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
    
    // Function to apply color class based on text content
    function applyTextColorClass(element, text) {
        // Remove all result classes first
        element.classList.remove('result-yes', 'result-no', 'result-never', 'result-notice', 'result-unavailable');
        
        // Apply class based on content
        if (text === 'YES') {
            element.classList.add('result-yes');
        } else if (text === 'NO') {
            element.classList.add('result-no');
        } else if (text === 'NEVER') {
            element.classList.add('result-never');
        } else if (text === 'Look at case notice') {
            element.classList.add('result-notice');
        } else if (text === 'Unavailable') {
            element.classList.add('result-unavailable');
        } else if (text.includes('YES')) {
            element.classList.add('result-yes');
        } else if (text.includes('NO')) {
            element.classList.add('result-no');
        }
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
                        copyButton.style.backgroundColor = ''; // Reset to use CSS variable
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
                        copyButton.style.backgroundColor = ''; // Reset to use CSS variable
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
                    copyButton.style.backgroundColor = ''; // Reset to use CSS variable
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                // Show error message
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Error!';
                copyButton.style.backgroundColor = '#EF4444'; // Error red
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.style.backgroundColor = ''; // Reset to use CSS variable
                }, 2000);
            }
            
            document.body.removeChild(textarea);
        }
    });