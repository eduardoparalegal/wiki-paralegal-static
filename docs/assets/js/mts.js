// Variable para almacenar el índice del cliente que se está editando/eliminando
let currentClientIndex = null;
let db; // Variable global para la base de datos Firestore
let firestore = {}; // Para almacenar las funciones de Firestore

// Inicializa Firebase y configura Firestore
function initializeFirebase() {
    // La configuración ya debería estar en el HTML, solo necesitamos obtener la instancia de Firestore
    import('https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js')
        .then((firestoreModule) => {
            // Guardar referencias globales a las funciones necesarias
            firestore = firestoreModule;
            const { getFirestore } = firestoreModule;
            db = getFirestore();
            console.log("Firebase Firestore initialized");
            loadClients(); // Cargar clientes después de inicializar Firestore
        })
        .catch(error => {
            console.error("Error loading Firestore:", error);
            showMessage('message', 'Error connecting to database. Using local storage temporarily.', true);
            // Fallback a localStorage si Firestore no está disponible
            loadClients();
        });
}

// Función para cambiar entre pestañas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Eliminar clase active de todas las pestañas y contenidos
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Añadir clase active a la pestaña actual y su contenido
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId + '-tab').classList.add('active');
    });
});

// Formatear el A# automáticamente
document.getElementById('anumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Eliminar no dígitos
    
    if (value.length > 9) {
        value = value.substr(0, 9);
    }
    
    // Agregar guiones automáticamente
    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }
    
    e.target.value = value;
});

document.getElementById('editAnumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 9) {
        value = value.substr(0, 9);
    }
    
    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }
    
    e.target.value = value;
});

// Contador de palabras para notas
document.getElementById('notes').addEventListener('input', function() {
    const wordCount = this.value.trim().split(/\s+/).filter(Boolean).length;
    document.getElementById('word-count').textContent = `${wordCount}/100 words`;
    
    // Limitar a 100 palabras
    if (wordCount > 100) {
        const words = this.value.trim().split(/\s+/);
        this.value = words.slice(0, 100).join(' ');
    }
});

document.getElementById('editNotes').addEventListener('input', function() {
    const wordCount = this.value.trim().split(/\s+/).filter(Boolean).length;
    document.getElementById('edit-word-count').textContent = `${wordCount}/100 words`;
    
    if (wordCount > 100) {
        const words = this.value.trim().split(/\s+/);
        this.value = words.slice(0, 100).join(' ');
    }
});

// Función para mostrar mensaje
function showMessage(elementId, message, isError = false) {
    const messageDiv = document.getElementById(elementId);
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'message error' : 'message success';
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Funciones de Firebase para CRUD
async function getClients() {
    if (!db) {
        // Fallback a localStorage si Firestore no está disponible
        try {
            const clientsJSON = localStorage.getItem('mtsClients');
            return clientsJSON ? JSON.parse(clientsJSON) : [];
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return [];
        }
    }

    try {
        const { collection, getDocs, query, orderBy } = firestore;
        const clientsRef = collection(db, 'clients');
        const q = query(clientsRef, orderBy('dateAdded', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const clients = [];
        querySnapshot.forEach((doc) => {
            clients.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return clients;
    } catch (error) {
        console.error("Error getting documents from Firestore:", error);
        return [];
    }
}

async function addClient(client) {
    if (!db) {
        // Fallback a localStorage si Firestore no está disponible
        try {
            const clients = JSON.parse(localStorage.getItem('mtsClients') || '[]');
            clients.push(client);
            localStorage.setItem('mtsClients', JSON.stringify(clients));
            return true;
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            return false;
        }
    }

    try {
        const { collection, addDoc } = firestore;
        const clientsRef = collection(db, 'clients');
        await addDoc(clientsRef, client);
        return true;
    } catch (error) {
        console.error("Error adding document to Firestore:", error);
        return false;
    }
}

async function updateClient(id, updatedClient) {
    if (!db) {
        // Fallback a localStorage si Firestore no está disponible
        try {
            const clients = JSON.parse(localStorage.getItem('mtsClients') || '[]');
            const index = clients.findIndex((client, idx) => idx === id);
            
            if (index >= 0) {
                clients[index] = updatedClient;
                localStorage.setItem('mtsClients', JSON.stringify(clients));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating in localStorage:", error);
            return false;
        }
    }

    try {
        const { doc, updateDoc } = firestore;
        const clientRef = doc(db, 'clients', id);
        await updateDoc(clientRef, updatedClient);
        return true;
    } catch (error) {
        console.error("Error updating document in Firestore:", error);
        return false;
    }
}

async function deleteClient(id) {
    if (!db) {
        // Fallback a localStorage si Firestore no está disponible
        try {
            const clients = JSON.parse(localStorage.getItem('mtsClients') || '[]');
            const newClients = clients.filter((client, idx) => idx !== id);
            localStorage.setItem('mtsClients', JSON.stringify(newClients));
            return true;
        } catch (error) {
            console.error("Error deleting from localStorage:", error);
            return false;
        }
    }

    try {
        const { doc, deleteDoc } = firestore;
        const clientRef = doc(db, 'clients', id);
        await deleteDoc(clientRef);
        return true;
    } catch (error) {
        console.error("Error deleting document from Firestore:", error);
        return false;
    }
}

// Cargar clientes en la tabla
async function loadClients() {
    const clientsTableBody = document.getElementById('clientsTableBody');
    clientsTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading clients...</td></tr>';
    
    try {
        const clients = await getClients();
        
        clientsTableBody.innerHTML = '';
        
        if (clients.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="7" style="text-align: center;">No clients registered</td>';
            clientsTableBody.appendChild(emptyRow);
        } else {
            clients.forEach((client, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${client.anumber}</td>
                    <td>${client.mtsLocation}</td>
                    <td>${client.consentimiento}</td>
                    <td>${client.estado}</td>
                    <td>${client.paralegal}</td>
                    <td>${formatDate(client.dateAdded)}</td>
                    <td>
                        <button class="edit-btn" data-id="${client.id || index}">Edit</button>
                        <button class="delete-btn delete" data-id="${client.id || index}">Delete</button>
                    </td>
                `;
                
                clientsTableBody.appendChild(row);
            });
            
            // Añadir event listeners a los botones
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    openEditModal(id);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    openDeleteModal(id);
                });
            });
        }
    } catch (error) {
        console.error("Error loading clients:", error);
        clientsTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Error loading clients</td></tr>';
    }
}

// Buscar cliente por A#
async function findClientByAnumber(anumber) {
    try {
        const clients = await getClients();
        const clientIndex = clients.findIndex(client => client.anumber === anumber);
        
        if (clientIndex !== -1) {
            return { client: clients[clientIndex], id: clients[clientIndex].id || clientIndex };
        }
        return null;
    } catch (error) {
        console.error("Error finding client:", error);
        return null;
    }
}

// Mostrar detalles de cliente en la pestaña de búsqueda
function displayClientDetails(clientData) {
    const container = document.getElementById('client-info-container');
    const clientDetails = document.getElementById('client-details');
    
    if (!clientData) {
        clientDetails.style.display = 'none';
        showMessage('searchMessage', 'Client not found', true);
        return;
    }
    
    const client = clientData.client;
    currentClientIndex = clientData.id;
    
    container.innerHTML = `
        <div class="detail-row"><span class="detail-label">A# Client:</span> ${client.anumber}</div>
        <div class="detail-row"><span class="detail-label">MTS Location:</span> ${client.mtsLocation}</div>
        <div class="detail-row"><span class="detail-label">Consent Evidence:</span> ${client.consentimiento}</div>
        <div class="detail-row"><span class="detail-label">MTS Status:</span> ${client.estado}</div>
        <div class="detail-row"><span class="detail-label">Paralegal:</span> ${client.paralegal}</div>
        <div class="detail-row"><span class="detail-label">Date Added:</span> ${formatDate(client.dateAdded)}</div>
        <div class="detail-row"><span class="detail-label">Notes:</span> ${client.notes || 'No notes'}</div>
    `;
    
    clientDetails.style.display = 'block';
}

// Abrir modal de eliminación
function openDeleteModal(id) {
    currentClientIndex = id;
    document.getElementById('deleteModal').style.display = 'block';
}

// Abrir modal de edición
async function openEditModal(id) {
    const clients = await getClients();
    const client = clients.find(c => (c.id || clients.indexOf(c)) == id);
    
    if (client) {
        currentClientIndex = id;
        
        // Llenar el formulario con los datos del cliente
        document.getElementById('editAnumber').value = client.anumber;
        document.getElementById('editMtsLocation').value = client.mtsLocation;
        document.getElementById('editConsentimiento').value = client.consentimiento;
        document.getElementById('editEstado').value = client.estado;
        document.getElementById('editParalegal').value = client.paralegal;
        document.getElementById('editNotes').value = client.notes || '';
        
        // Actualizar contador de palabras
        const wordCount = (client.notes || '').trim().split(/\s+/).filter(Boolean).length;
        document.getElementById('edit-word-count').textContent = `${wordCount}/100 words`;
        
        // Mostrar el modal
        document.getElementById('editModal').style.display = 'block';
    }
}

// Event Listeners

// Envío del formulario
document.getElementById('clientForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const anumber = document.getElementById('anumber').value;
    const mtsLocation = document.getElementById('mtsLocation').value;
    const consentimiento = document.getElementById('consentimiento').value;
    const estado = document.getElementById('estado').value;
    const paralegal = document.getElementById('paralegal').value;
    const notes = document.getElementById('notes').value;
    
    // Validar A# (debe tener formato 000-000-000)
    const anumberRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!anumberRegex.test(anumber)) {
        showMessage('message', 'The A# must have the format 000-000-000', true);
        return;
    }
    
    const client = {
        anumber,
        mtsLocation,
        consentimiento,
        estado,
        paralegal,
        notes,
        dateAdded: new Date().toISOString()
    };
    
    try {
        if (await addClient(client)) {
            showMessage('message', 'Client added successfully');
            this.reset();
            document.getElementById('word-count').textContent = '0/100 words';
            await loadClients();
        } else {
            showMessage('message', 'Error adding client', true);
        }
    } catch (error) {
        console.error("Error in form submission:", error);
        showMessage('message', 'Error adding client: ' + error.message, true);
    }
});

// Formatear el A# automáticamente en el campo de búsqueda
document.getElementById('searchInput').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Eliminar no dígitos
    
    if (value.length > 9) {
        value = value.substr(0, 9);
    }
    
    // Agregar guiones automáticamente
    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }
    
    e.target.value = value;
});

// Búsqueda de cliente
document.getElementById('searchButton').addEventListener('click', async function() {
    const searchValue = document.getElementById('searchInput').value.trim();
    
    if (!searchValue) {
        showMessage('searchMessage', 'Please enter an A# to search', true);
        return;
    }
    
    try {
        const clientData = await findClientByAnumber(searchValue);
        displayClientDetails(clientData);
    } catch (error) {
        console.error("Error in search:", error);
        showMessage('searchMessage', 'Error searching for client: ' + error.message, true);
    }
});

// Botón Editar en la pestaña de búsqueda
document.getElementById('editClientBtn').addEventListener('click', function() {
    openEditModal(currentClientIndex);
});

// Botón Eliminar en la pestaña de búsqueda
document.getElementById('deleteClientBtn').addEventListener('click', function() {
    openDeleteModal(currentClientIndex);
});

// Confirmar eliminación
document.getElementById('confirmDelete').addEventListener('click', async function() {
    try {
        if (await deleteClient(currentClientIndex)) {
            document.getElementById('deleteModal').style.display = 'none';
            
            // Si estamos en la pestaña de búsqueda, ocultar los detalles
            if (document.getElementById('search-tab').classList.contains('active')) {
                document.getElementById('client-details').style.display = 'none';
                document.getElementById('searchInput').value = '';
                showMessage('searchMessage', 'Client deleted successfully');
            } else {
                showMessage('message', 'Client deleted successfully');
            }
            
            await loadClients();
        } else {
            showMessage('message', 'Error deleting client', true);
        }
    } catch (error) {
        console.error("Error deleting client:", error);
        showMessage('message', 'Error deleting client: ' + error.message, true);
    }
});

// Cancelar eliminación
document.getElementById('cancelDelete').addEventListener('click', function() {
    document.getElementById('deleteModal').style.display = 'none';
});

// Guardar cambios de edición
document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const anumber = document.getElementById('editAnumber').value;
    const mtsLocation = document.getElementById('editMtsLocation').value;
    const consentimiento = document.getElementById('editConsentimiento').value;
    const estado = document.getElementById('editEstado').value;
    const paralegal = document.getElementById('editParalegal').value;
    const notes = document.getElementById('editNotes').value;
    
    // Validar A# (debe tener formato 000-000-000)
    const anumberRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!anumberRegex.test(anumber)) {
        showMessage('editMessage', 'The A# must have the format 000-000-000', true);
        return;
    }
    
    try {
        // Si estamos usando Firestore, necesitamos mantener el id separado
        const clients = await getClients();
        const clientToUpdate = clients.find(c => (c.id || clients.indexOf(c)) == currentClientIndex);
        
        if (!clientToUpdate) {
            showMessage('message', 'Client not found', true);
            return;
        }
        
        const updatedClient = {
            anumber,
            mtsLocation,
            consentimiento,
            estado,
            paralegal,
            notes,
            dateAdded: clientToUpdate.dateAdded
        };
        
        if (await updateClient(currentClientIndex, updatedClient)) {
            document.getElementById('editModal').style.display = 'none';
            
            // Si estamos en la pestaña de búsqueda, actualizar los detalles
            if (document.getElementById('search-tab').classList.contains('active')) {
                displayClientDetails({ client: updatedClient, id: currentClientIndex });
                showMessage('searchMessage', 'Client information updated successfully');
            } else {
                showMessage('message', 'Client information updated successfully');
            }
            
            await loadClients();
        } else {
            showMessage('message', 'Error updating client information', true);
        }
    } catch (error) {
        console.error("Error updating client:", error);
        showMessage('message', 'Error updating client: ' + error.message, true);
    }
});

// Cancelar edición
document.getElementById('cancelEdit').addEventListener('click', function() {
    document.getElementById('editModal').style.display = 'none';
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
});