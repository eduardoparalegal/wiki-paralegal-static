import { clientsCollection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from './firebase-config.js';
import { createReminder, updateReminder, deleteReminder } from './calendar-integration.js';

// Global variables
let clients = [];
let currentClientId = null;

// DOM elements
const aNumberInput = document.getElementById('aNumber');
const statusSelect = document.getElementById('status');
const hasNoteCheckbox = document.getElementById('hasNote');
const noteSection = document.getElementById('noteSection');
const noteInput = document.getElementById('note');
const wordCountSpan = document.getElementById('wordCount');
const reminderDateInput = document.getElementById('reminderDate');
const reminderTimeInput = document.getElementById('reminderTime');
const saveButton = document.getElementById('saveButton');
const messageElement = document.getElementById('message');
const clientsTableBody = document.querySelector('#clientsTable tbody');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const editModal = document.getElementById('editModal');
const closeModalButton = document.querySelector('.close');
const editANumberInput = document.getElementById('editANumber');
const editStatusSelect = document.getElementById('editStatus');
const editHasNoteCheckbox = document.getElementById('editHasNote');
const editNoteSection = document.getElementById('editNoteSection');
const editNoteInput = document.getElementById('editNote');
const editWordCountSpan = document.getElementById('editWordCount');
const editReminderDateInput = document.getElementById('editReminderDate');
const editReminderTimeInput = document.getElementById('editReminderTime');
const updateButton = document.getElementById('updateButton');
const deleteButton = document.getElementById('deleteButton');

// Function to format A# automatically (000-000-000)
function formatANumber(input) {
    // Remove non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 9 digits
    value = value.substring(0, 9);
    
    // Apply format XXX-XXX-XXX
    if (value.length > 6) {
        value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6);
    } else if (value.length > 3) {
        value = value.substring(0, 3) + '-' + value.substring(3);
    }
    
    // Update input value
    input.value = value;
}

// Function to count words
function countWords(input, countElement) {
    const words = input.value.trim().split(/\s+/);
    const wordCount = input.value.trim() === '' ? 0 : words.length;
    countElement.textContent = `${wordCount}/10`;
    
    // Validate word limit
    if (wordCount > 10) {
        countElement.style.color = 'red';
    } else {
        countElement.style.color = '#999';
    }
}

// Function to show message
function showMessage(message, isError = false) {
    messageElement.textContent = message;
    messageElement.className = isError ? 'message error' : 'message success';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = 'message';
    }, 3000);
}

// Function to load clients from Firebase
async function loadClients() {
    try {
        const querySnapshot = await getDocs(clientsCollection);
        clients = [];
        
        querySnapshot.forEach((doc) => {
            clients.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        renderClientsTable();
    } catch (error) {
        console.error("Error loading clients:", error);
        showMessage("Error loading clients: " + error.message, true);
    }
}

// Function to render clients table
function renderClientsTable() {
    clientsTableBody.innerHTML = '';
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        
        // Format date and time if exists
        let reminderText = 'N/A';
        if (client.reminderDate && client.reminderTime) {
            const date = new Date(client.reminderDate + 'T' + client.reminderTime);
            reminderText = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
        
        row.innerHTML = `
            <td>${client.aNumber}</td>
            <td>${client.status}</td>
            <td>${client.note || 'N/A'}</td>
            <td>${reminderText}</td>
            <td class="action-buttons">
                <button class="edit-button" data-id="${client.id}">Edit</button>
            </td>
        `;
        
        clientsTableBody.appendChild(row);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', () => {
            const clientId = button.getAttribute('data-id');
            openEditModal(clientId);
        });
    });
}

// Function to open edit modal
function openEditModal(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    currentClientId = clientId;
    
    // Fill modal fields with client info
    editANumberInput.value = client.aNumber;
    editStatusSelect.value = client.status;
    
    if (client.note) {
        editHasNoteCheckbox.checked = true;
        editNoteSection.classList.remove('hidden');
        editNoteInput.value = client.note;
        countWords(editNoteInput, editWordCountSpan);
    } else {
        editHasNoteCheckbox.checked = false;
        editNoteSection.classList.add('hidden');
        editNoteInput.value = '';
        editWordCountSpan.textContent = '0/10';
    }
    
    if (client.reminderDate && client.reminderTime) {
        editReminderDateInput.value = client.reminderDate;
        editReminderTimeInput.value = client.reminderTime;
    } else {
        editReminderDateInput.value = '';
        editReminderTimeInput.value = '';
    }
    
    // Show modal
    editModal.style.display = 'block';
}

// Function to search clients
async function searchClients() {
    const searchValue = searchInput.value.trim();
    
    if (!searchValue) {
        searchResults.innerHTML = '';
        return;
    }
    
    try {
        let results = [];
        
        // If search value has A# format, search by A#
        if (/^\d{3}-\d{3}-\d{3}$/.test(searchValue)) {
            const q = query(clientsCollection, where("aNumber", "==", searchValue));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        } else {
            // Search in local clients (any partial match)
            results = clients.filter(client => 
                client.aNumber.includes(searchValue) || 
                (client.note && client.note.toLowerCase().includes(searchValue.toLowerCase()))
            );
        }
        
        // Display results
        displaySearchResults(results);
    } catch (error) {
        console.error("Error searching clients:", error);
        showMessage("Error searching clients: " + error.message, true);
    }
}

// Function to display search results
function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
    }
    
    results.forEach(client => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <p><strong>A#:</strong> ${client.aNumber}</p>
            <p><strong>Status:</strong> ${client.status}</p>
            <p><strong>Note:</strong> ${client.note || 'N/A'}</p>
        `;
        
        resultItem.addEventListener('click', () => {
            openEditModal(client.id);
        });
        
        searchResults.appendChild(resultItem);
    });
}

// Function to save a new client
async function saveClient() {
    // Validate A#
    const aNumber = aNumberInput.value.trim();
    if (!aNumber || !/^\d{3}-\d{3}-\d{3}$/.test(aNumber)) {
        showMessage("Please enter a valid A# in 000-000-000 format", true);
        return;
    }
    
    // Check if A# already exists
    const clientExists = clients.some(client => client.aNumber === aNumber);
    if (clientExists) {
        showMessage("A client with this A# already exists", true);
        return;
    }
    
    // Get status
    const status = statusSelect.value;
    
    // Validate note if enabled
    let note = null;
    let reminderDate = null;
    let reminderTime = null;
    let eventId = null;
    
    if (hasNoteCheckbox.checked) {
        note = noteInput.value.trim();
        
        // Validate word limit
        const words = note.split(/\s+/);
        if (note !== '' && words.length > 10) {
            showMessage("Note cannot have more than 10 words", true);
            return;
        }
        
        // Validate date and time if there's a note
        reminderDate = reminderDateInput.value;
        reminderTime = reminderTimeInput.value;
        
        if (!reminderDate || !reminderTime) {
            showMessage("Please enter date and time for the reminder", true);
            return;
        }
        
        // Create reminder in Google Calendar
        try {
            const reminderDateTime = `${reminderDate}T${reminderTime}:00`;
            const calendarResponse = await createReminder(aNumber, note, reminderDateTime);
            
            if (!calendarResponse.success) {
                showMessage(calendarResponse.message, true);
                return;
            }
            
            eventId = calendarResponse.eventId;
        } catch (error) {
            console.error("Error creating reminder:", error);
            showMessage("Error creating reminder: " + error.message, true);
            return;
        }
    }
    
    // Save client to Firebase
    try {
        const clientData = {
            aNumber,
            status,
            note,
            reminderDate,
            reminderTime,
            eventId,
            createdAt: new Date().toISOString()
        };
        
        await addDoc(clientsCollection, clientData);
        
        // Clear form
        aNumberInput.value = '';
        statusSelect.value = 'not drafted';
        hasNoteCheckbox.checked = false;
        noteSection.classList.add('hidden');
        noteInput.value = '';
        wordCountSpan.textContent = '0/10';
        reminderDateInput.value = '';
        reminderTimeInput.value = '';
        
        // Show success message
        showMessage("Client saved successfully");
        
        // Reload clients
        await loadClients();
    } catch (error) {
        console.error("Error saving client:", error);
        showMessage("Error saving client: " + error.message, true);
    }
}

// Function to update a client
async function updateClient() {
    if (!currentClientId) return;
    
    const client = clients.find(c => c.id === currentClientId);
    if (!client) return;
    
    // Get updated data
    const status = editStatusSelect.value;
    
    // Validate note if enabled
    let note = null;
    let reminderDate = null;
    let reminderTime = null;
    let eventId = client.eventId;
    
    if (editHasNoteCheckbox.checked) {
        note = editNoteInput.value.trim();
        
        // Validate word limit
        const words = note.split(/\s+/);
        if (note !== '' && words.length > 10) {
            showMessage("Note cannot have more than 10 words", true);
            return;
        }
        
        // Validate date and time if there's a note
        reminderDate = editReminderDateInput.value;
        reminderTime = editReminderTimeInput.value;
        
        if (!reminderDate || !reminderTime) {
            showMessage("Please enter date and time for the reminder", true);
            return;
        }
        
        // Update or create reminder in Google Calendar
        try {
            const reminderDateTime = `${reminderDate}T${reminderTime}:00`;
            let calendarResponse;
            
            if (eventId) {
                // Update existing reminder
                calendarResponse = await updateReminder(eventId, client.aNumber, note, reminderDateTime);
            } else {
                // Create new reminder
                calendarResponse = await createReminder(client.aNumber, note, reminderDateTime);
            }
            
            if (!calendarResponse.success) {
                showMessage(calendarResponse.message, true);
                return;
            }
            
            eventId = calendarResponse.eventId;
        } catch (error) {
            console.error("Error updating reminder:", error);
            showMessage("Error updating reminder: " + error.message, true);
            return;
        }
    } else if (client.eventId) {
        // Delete reminder if it exists and note is disabled
        try {
            const calendarResponse = await deleteReminder(client.eventId);
            
            if (!calendarResponse.success) {
                showMessage(calendarResponse.message, true);
                return;
            }
            
            eventId = null;
        } catch (error) {
            console.error("Error deleting reminder:", error);
            showMessage("Error deleting reminder: " + error.message, true);
            return;
        }
    }
    
    // Update client in Firebase
    try {
        const docRef = doc(clientsCollection, currentClientId);
        const clientData = {
            status,
            note,
            reminderDate,
            reminderTime,
            eventId,
            updatedAt: new Date().toISOString()
        };
        
        await updateDoc(docRef, clientData);
        
        // Close modal
        editModal.style.display = 'none';
        
        // Show success message
        showMessage("Client updated successfully");
        
        // Reload clients
        await loadClients();
    } catch (error) {
        console.error("Error updating client:", error);
        showMessage("Error updating client: " + error.message, true);
    }
}

// Function to delete a client
async function deleteClient() {
    if (!currentClientId) return;
    
    if (!confirm("Are you sure you want to delete this client?")) {
        return;
    }
    
    const client = clients.find(c => c.id === currentClientId);
    if (!client) return;
    
    // Delete reminder from Google Calendar if it exists
    if (client.eventId) {
        try {
            const calendarResponse = await deleteReminder(client.eventId);
            
            if (!calendarResponse.success) {
                showMessage(calendarResponse.message, true);
                return;
            }
        } catch (error) {
            console.error("Error deleting reminder:", error);
            showMessage("Error deleting reminder: " + error.message, true);
            return;
        }
    }
    
    // Delete client from Firebase
    try {
        const docRef = doc(clientsCollection, currentClientId);
        await deleteDoc(docRef);
        
        // Close modal
        editModal.style.display = 'none';
        
        // Show success message
        showMessage("Client deleted successfully");
        
        // Reload clients
        await loadClients();
    } catch (error) {
        console.error("Error deleting client:", error);
        showMessage("Error deleting client: " + error.message, true);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Format A# automatically
    aNumberInput.addEventListener('input', () => formatANumber(aNumberInput));
    
    // Also format A# in search input
    searchInput.addEventListener('input', () => formatANumber(searchInput));
    
    // Count words in note
    noteInput.addEventListener('input', () => countWords(noteInput, wordCountSpan));
    editNoteInput.addEventListener('input', () => countWords(editNoteInput, editWordCountSpan));
    
    // Show/hide note section
    hasNoteCheckbox.addEventListener('change', () => {
        if (hasNoteCheckbox.checked) {
            noteSection.classList.remove('hidden');
        } else {
            noteSection.classList.add('hidden');
        }
    });
    
    editHasNoteCheckbox.addEventListener('change', () => {
        if (editHasNoteCheckbox.checked) {
            editNoteSection.classList.remove('hidden');
        } else {
            editNoteSection.classList.add('hidden');
        }
    });
    
    // Save client
    saveButton.addEventListener('click', saveClient);
    
    // Search clients
    searchButton.addEventListener('click', searchClients);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchClients();
        }
    });
    
    // Edit modal
    closeModalButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Update and delete client
    updateButton.addEventListener('click', updateClient);
    deleteButton.addEventListener('click', deleteClient);
    
    // Load clients on startup
    loadClients();
});

