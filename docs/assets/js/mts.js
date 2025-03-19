// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW4Nrvz8TXu6gdsGuOpmNKexmNoZ75uv0",
  authDomain: "base-de-datos-de-cliente-71302.firebaseapp.com",
  projectId: "base-de-datos-de-cliente-71302",
  storageBucket: "base-de-datos-de-cliente-71302.firebasestorage.app",
  messagingSenderId: "532728219495",
  appId: "1:532728219495:web:bce1f335da96be930ad1c2",
  measurementId: "G-Y1M6QJ30B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// DOM Elements
const statusForm = document.getElementById('statusForm');
const editForm = document.getElementById('editForm');
const leaveNoteCheckbox = document.getElementById('leaveNote');
const noteSection = document.getElementById('noteSection');
const noteText = document.getElementById('noteText');
const wordCount = document.getElementById('wordCount');
const editLeaveNoteCheckbox = document.getElementById('editLeaveNote');
const editNoteSection = document.getElementById('editNoteSection');
const editNoteText = document.getElementById('editNoteText');
const editWordCount = document.getElementById('editWordCount');
const messageDiv = document.getElementById('message');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');
const deleteBtn = document.getElementById('deleteBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const aNumberInput = document.getElementById('aNumber');
const searchANumberInput = document.getElementById('searchANumber');
const editANumberInput = document.getElementById('editANumber');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Format A# inputs
    setupANumberInput(aNumberInput);
    setupANumberInput(searchANumberInput);
    setupANumberInput(editANumberInput);

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Deactivate all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activate selected tab
            btn.classList.add('active');
            document.getElementById(`${tabId}Tab`).classList.add('active');
            
            // Clear messages
            messageDiv.textContent = '';
            messageDiv.className = 'message';
            
            // Reset search results
            if (tabId === 'add') {
                searchResults.classList.add('hidden');
                noResults.classList.add('hidden');
            }
        });
    });

    // Toggle note section visibility
    leaveNoteCheckbox.addEventListener('change', function() {
        noteSection.classList.toggle('hidden', !this.checked);
    });
    
    editLeaveNoteCheckbox.addEventListener('change', function() {
        editNoteSection.classList.toggle('hidden', !this.checked);
    });

    // Word count for note (limit to 10 words)
    noteText.addEventListener('input', function() {
        countWords(this, wordCount);
    });
    
    editNoteText.addEventListener('input', function() {
        countWords(this, editWordCount);
    });

    // Form submission for adding new record
    statusForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const aNumber = aNumberInput.value;
            
            // Validate A# format
            if (!validateANumber(aNumber)) {
                showMessage('El A# debe tener el formato 123-123-123', 'error');
                return;
            }
            
            const status = document.getElementById('status').value;
            const hasNote = leaveNoteCheckbox.checked;
            
            let recordData = {
                aNumber: aNumber,
                status: status,
                hasNote: hasNote,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            
            if (hasNote) {
                const reminderDate = document.getElementById('reminderDate').value;
                const note = noteText.value.trim();
                
                if (!reminderDate) {
                    showMessage('Por favor seleccione una fecha para el recordatorio', 'error');
                    return;
                }
                
                if (note === '') {
                    showMessage('Por favor ingrese una nota', 'error');
                    return;
                }
                
                recordData.reminderDate = reminderDate;
                recordData.note = note;
            }
            
            // Add document to Firestore
            await addDoc(collection(db, "registros"), recordData);
            
            // Clear form
            statusForm.reset();
            noteSection.classList.add('hidden');
            
            // Show success message
            showMessage('Registro guardado exitosamente', 'success');
            
        } catch (error) {
            console.error("Error al guardar el registro:", error);
            showMessage('Error al guardar el registro', 'error');
        }
    });
    
    // Search for record
    searchBtn.addEventListener('click', async function() {
        const searchValue = searchANumberInput.value.trim();
        
        if (!searchValue) {
            showMessage('Por favor ingrese un A# para buscar', 'error');
            return;
        }
        
        // Validate A# format
        if (!validateANumber(searchValue)) {
            showMessage('El A# debe tener el formato 123-123-123', 'error');
            return;
        }
        
        try {
            const q = query(collection(db, "registros"), where("aNumber", "==", searchValue));
            const querySnapshot = await getDocs(q);
            
            searchResults.classList.add('hidden');
            noResults.classList.add('hidden');
            
            if (querySnapshot.empty) {
                noResults.classList.remove('hidden');
                return;
            }
            
            // Use the first matching document
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            
            // Fill the edit form
            document.getElementById('docId').value = doc.id;
            document.getElementById('editANumber').value = data.aNumber;
            document.getElementById('editStatus').value = data.status;
            
            // Handle note section
            const hasNote = data.hasNote;
            editLeaveNoteCheckbox.checked = hasNote;
            editNoteSection.classList.toggle('hidden', !hasNote);
            
            if (hasNote) {
                document.getElementById('editReminderDate').value = data.reminderDate;
                document.getElementById('editNoteText').value = data.note;
                countWords(document.getElementById('editNoteText'), editWordCount);
            } else {
                document.getElementById('editReminderDate').value = '';
                document.getElementById('editNoteText').value = '';
                editWordCount.textContent = '0/10 palabras';
            }
            
            searchResults.classList.remove('hidden');
            
        } catch (error) {
            console.error("Error al buscar el registro:", error);
            showMessage('Error al buscar el registro', 'error');
        }
    });
    
    // Edit form submission
    editForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const docId = document.getElementById('docId').value;
            const aNumber = editANumberInput.value;
            
            // Validate A# format
            if (!validateANumber(aNumber)) {
                showMessage('El A# debe tener el formato 123-123-123', 'error');
                return;
            }
            
            const status = document.getElementById('editStatus').value;
            const hasNote = editLeaveNoteCheckbox.checked;
            
            let recordData = {
                aNumber: aNumber,
                status: status,
                hasNote: hasNote,
                updatedAt: serverTimestamp()
            };
            
            if (hasNote) {
                const reminderDate = document.getElementById('editReminderDate').value;
                const note = document.getElementById('editNoteText').value.trim();
                
                if (!reminderDate) {
                    showMessage('Por favor seleccione una fecha para el recordatorio', 'error');
                    return;
                }
                
                if (note === '') {
                    showMessage('Por favor ingrese una nota', 'error');
                    return;
                }
                
                recordData.reminderDate = reminderDate;
                recordData.note = note;
            } else {
                // Remove the note fields if they exist
                recordData.reminderDate = null;
                recordData.note = null;
            }
            
            // Update document in Firestore
            const docRef = doc(db, "registros", docId);
            await updateDoc(docRef, recordData);
            
            // Show success message
            showMessage('Registro actualizado exitosamente', 'success');
            
        } catch (error) {
            console.error("Error al actualizar el registro:", error);
            showMessage('Error al actualizar el registro', 'error');
        }
    });
    
    // Delete record
    deleteBtn.addEventListener('click', async function() {
        if (confirm('¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.')) {
            try {
                const docId = document.getElementById('docId').value;
                
                // Delete document from Firestore
                const docRef = doc(db, "registros", docId);
                await deleteDoc(docRef);
                
                // Hide search results
                searchResults.classList.add('hidden');
                document.getElementById('searchANumber').value = '';
                
                // Show success message
                showMessage('Registro eliminado exitosamente', 'success');
                
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                showMessage('Error al eliminar el registro', 'error');
            }
        }
    });
});

// Helper function to validate A# format
function validateANumber(aNumber) {
    const regex = /^\d{3}-\d{3}-\d{3}$/;
    return regex.test(aNumber);
}

// Helper function to format A# input
function setupANumberInput(input) {
    if (!input) return;
    
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
        
        if (value.length > 9) {
            value = value.slice(0, 9);
        }
        
        // Format as XXX-XXX-XXX
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,3}', 'g')).join('-');
        }
        
        e.target.value = value;
    });
}

// Helper function to show messages
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 5000);
}

// Helper function to count words
function countWords(textarea, countElement) {
    const text = textarea.value.trim();
    const words = text === '' ? [] : text.split(/\s+/);
    const wordNum = words.length;
    
    countElement.textContent = `${wordNum}/10 palabras`;
    
    // Limit to 10 words
    if (wordNum > 10) {
        const limitedText = words.slice(0, 10).join(' ');
        textarea.value = limitedText;
        countElement.textContent = `10/10 palabras`;
    }
}