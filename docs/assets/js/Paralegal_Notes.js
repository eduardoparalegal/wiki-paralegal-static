// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

// Form Elements
const createForm = document.getElementById('createForm');
const searchForm = document.getElementById('searchForm');
const modifySearchForm = document.getElementById('modifySearchForm');
const modifyForm = document.getElementById('modifyForm');
const searchResult = document.getElementById('searchResult');

// Navigation Handler
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        const sectionId = button.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Clear forms and results
        clearForms();
    });
});

// A# Format Validation
function validateANumber(aNumber) {
    const pattern = /^\d{3}-\d{3}-\d{3}$/;
    return pattern.test(aNumber);
}

// Format A# input while typing
function formatANumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 9) value = value.substr(0, 9);
    
    if (value.length >= 6) {
        value = value.substr(0, 3) + '-' + value.substr(3, 3) + '-' + value.substr(6);
    } else if (value.length >= 3) {
        value = value.substr(0, 3) + '-' + value.substr(3);
    }
    
    input.value = value;
}

// Add format handlers to A# inputs
document.querySelectorAll('input[id$="ANumber"]').forEach(input => {
    input.addEventListener('input', () => formatANumber(input));
});

// Create Form Handler
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('createName').value.trim();
    const aNumber = document.getElementById('createANumber').value.trim();
    const note = document.getElementById('createNote').value.trim();
    
    if (!validateANumber(aNumber)) {
        showMessage('error', 'Invalid A# format. Please use ###-###-### format.');
        return;
    }
    
    // Get existing data or initialize empty array
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    
    // Check if A# already exists
    if (clients.some(client => client.aNumber === aNumber)) {
        showMessage('error', 'A client with this A# already exists.');
        return;
    }
    
    // Add new client
    clients.push({ name, aNumber, note });
    localStorage.setItem('clients', JSON.stringify(clients));
    
    showMessage('success', 'Client record created successfully!');
    createForm.reset();
});

// Search Form Handler
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const aNumber = document.getElementById('searchANumber').value.trim();
    const client = findClient(aNumber);
    
    displaySearchResult(client);
});

// Modify Search Form Handler
modifySearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const aNumber = document.getElementById('modifyANumber').value.trim();
    const client = findClient(aNumber);
    
    if (client) {
        document.getElementById('modifyName').value = client.name;
        document.getElementById('modifyNote').value = client.note;
        modifyForm.classList.remove('hidden');
        
        // Add submit handler for modify form
        modifyForm.onsubmit = (e) => {
            e.preventDefault();
            
            const updatedClient = {
                aNumber,
                name: document.getElementById('modifyName').value.trim(),
                note: document.getElementById('modifyNote').value.trim()
            };
            
            updateClient(updatedClient);
            showMessage('success', 'Client record updated successfully!');
            modifyForm.classList.add('hidden');
            modifySearchForm.reset();
        };
    } else {
        modifyForm.classList.add('hidden');
        showMessage('error', 'Client not found.');
    }
});

// Helper Functions
function findClient(aNumber) {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    return clients.find(client => client.aNumber === aNumber);
}

function updateClient(updatedClient) {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const index = clients.findIndex(client => client.aNumber === updatedClient.aNumber);
    
    if (index !== -1) {
        clients[index] = updatedClient;
        localStorage.setItem('clients', JSON.stringify(clients));
    }
}

function displaySearchResult(client) {
    searchResult.style.display = 'block';
    
    if (client) {
        searchResult.innerHTML = `
            <h3>Client Information</h3>
            <p><strong>Name:</strong> ${client.name}</p>
            <p><strong>A#:</strong> ${client.aNumber}</p>
            <p><strong>Note:</strong> ${client.note}</p>
        `;
    } else {
        searchResult.innerHTML = '<p class="error-message">Client not found.</p>';
    }
}

function showMessage(type, message) {
    const messageElement = document.createElement('p');
    messageElement.className = `${type}-message`;
    messageElement.textContent = message;
    
    // Find the active form and append message
    const activeSection = document.querySelector('.section.active');
    const existingMessage = activeSection.querySelector(`.${type}-message`);
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    activeSection.querySelector('form').appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => messageElement.remove(), 3000);
}

function clearForms() {
    createForm.reset();
    searchForm.reset();
    modifySearchForm.reset();
    modifyForm.reset();
    modifyForm.classList.add('hidden');
    searchResult.style.display = 'none';
    
    // Remove any existing messages
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
}