// notifications.js - Sistema de notificaciones y recordatorios
import { db } from './mts.js';
import { 
    collection, 
    query, 
    where, 
    getDocs,
    Timestamp 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// DOM Elements
const notificationContainer = document.getElementById('notification-container');
const notificationsList = document.getElementById('notifications-list');
const notificationCount = document.getElementById('notification-count');
const notificationIcon = document.getElementById('notification-icon');
const clearAllBtn = document.getElementById('clear-all-notifications');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de notificaciones
    initNotifications();
    
    // Verificar recordatorios al cargar la página
    checkReminders();
    
    // Toggle notifications panel
    notificationIcon.addEventListener('click', function() {
        notificationContainer.classList.toggle('open');
    });
    
    // Cerrar notificaciones al hacer clic fuera del panel
    document.addEventListener('click', function(event) {
        if (!notificationContainer.contains(event.target) && 
            !notificationIcon.contains(event.target)) {
            notificationContainer.classList.remove('open');
        }
    });
    
    // Limpiar todas las notificaciones
    clearAllBtn.addEventListener('click', function() {
        clearAllNotifications();
    });
});

/**
 * Inicializar el sistema de notificaciones
 */
function initNotifications() {
    // Cargar notificaciones guardadas en localStorage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Actualizar UI
    updateNotificationsUI(savedNotifications);
}

/**
 * Verificar si hay recordatorios para el día actual
 */
export async function checkReminders() {
    try {
        // Obtener fecha actual
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Obtener fecha de mañana
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Formatear fechas para consulta
        const todayStr = today.toISOString().split('T')[0];
        
        // Consultar recordatorios para hoy
        const q = query(
            collection(db, "registros"),
            where("hasNote", "==", true),
            where("reminderDate", "==", todayStr)
        );
        
        const querySnapshot = await getDocs(q);
        
        // Procesar los recordatorios encontrados
        let newNotifications = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Crear notificación
            newNotifications.push({
                id: doc.id,
                title: `Reminder: A# ${data.aNumber}`,
                message: `Status: ${data.status} - ${data.note}`,
                time: new Date().toISOString(),
                aNumber: data.aNumber,
                read: false
            });
        });
        
        // Si hay nuevas notificaciones
        if (newNotifications.length > 0) {
            // Cargar notificaciones existentes
            const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
            
            // Filtrar duplicados (basados en ID)
            const existingIds = new Set(existingNotifications.map(n => n.id));
            const uniqueNewNotifications = newNotifications.filter(n => !existingIds.has(n.id));
            
            // Si hay notificaciones únicas nuevas
            if (uniqueNewNotifications.length > 0) {
                // Combinar con las existentes
                const updatedNotifications = [...uniqueNewNotifications, ...existingNotifications];
                
                // Guardar en localStorage
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                
                // Actualizar UI
                updateNotificationsUI(updatedNotifications);
                
                // Mostrar notificación toast para cada nueva notificación
                uniqueNewNotifications.forEach(notification => {
                    showToastNotification(notification);
                });
            }
        }
        
        return newNotifications.length;
        
    } catch (error) {
        console.error("Error checking reminders:", error);
        return 0;
    }
}

/**
 * Actualizar la interfaz de notificaciones
 * @param {Array} notifications - Lista de notificaciones
 */
function updateNotificationsUI(notifications) {
    // Actualizar contador
    const unreadCount = notifications.filter(n => !n.read).length;
    notificationCount.textContent = unreadCount;
    
    // Mostrar/ocultar contador según haya notificaciones
    if (unreadCount > 0) {
        notificationCount.classList.remove('hidden');
    } else {
        notificationCount.classList.add('hidden');
    }
    
    // Limpiar lista
    notificationsList.innerHTML = '';
    
    // Si no hay notificaciones
    if (notifications.length === 0) {
        notificationsList.innerHTML = '<li class="no-notifications">No hay notificaciones</li>';
        clearAllBtn.classList.add('hidden');
        return;
    }
    
    // Mostrar botón de limpiar
    clearAllBtn.classList.remove('hidden');
    
    // Ordenar por tiempo (más recientes primero)
    notifications.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Crear elementos de notificación
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        
        // Formatear tiempo
        const notificationTime = new Date(notification.time);
        const formattedTime = notificationTime.toLocaleString();
        
        // Crear contenido
        li.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">${notification.title}</span>
                <span class="notification-time">${formattedTime}</span>
            </div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-actions">
                <button class="btn btn-small mark-as-read" data-id="${notification.id}">
                    ${notification.read ? 'Mark as unread' : 'Mark as read'}
                </button>
                <button class="btn btn-small view-record" data-anumber="${notification.aNumber}">
                    View Record
                </button>
                <button class="btn btn-small delete-notification" data-id="${notification.id}">
                    Delete
                </button>
            </div>
        `;
        
        // Añadir a la lista
        notificationsList.appendChild(li);
        
        // Añadir event listeners a los botones
        li.querySelector('.mark-as-read').addEventListener('click', function() {
            toggleNotificationRead(notification.id);
        });
        
        li.querySelector('.view-record').addEventListener('click', function() {
            viewRecord(notification.aNumber);
        });
        
        li.querySelector('.delete-notification').addEventListener('click', function() {
            deleteNotification(notification.id);
        });
    });
}

/**
 * Marcar notificación como leída/no leída
 * @param {string} id - ID de la notificación
 */
function toggleNotificationRead(id) {
    // Cargar notificaciones
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Buscar la notificación
    const index = notifications.findIndex(n => n.id === id);
    
    if (index !== -1) {
        // Cambiar estado
        notifications[index].read = !notifications[index].read;
        
        // Guardar
        localStorage.setItem('notifications', JSON.stringify(notifications));
        
        // Actualizar UI
        updateNotificationsUI(notifications);
    }
}

/**
 * Ver registro asociado a una notificación
 * @param {string} aNumber - Número A del registro
 */
function viewRecord(aNumber) {
    // Redirigir a la pestaña de búsqueda con el A# pre-rellenado
    window.location.href = `index.html?aNumber=${aNumber}`;
}

/**
 * Eliminar una notificación
 * @param {string} id - ID de la notificación
 */
function deleteNotification(id) {
    // Cargar notificaciones
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Filtrar la notificación a eliminar
    const updatedNotifications = notifications.filter(n => n.id !== id);
    
    // Guardar
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    // Actualizar UI
    updateNotificationsUI(updatedNotifications);
}

/**
 * Limpiar todas las notificaciones
 */
function clearAllNotifications() {
    // Limpiar localStorage
    localStorage.setItem('notifications', JSON.stringify([]));
    
    // Actualizar UI
    updateNotificationsUI([]);
}

/**
 * Mostrar notificación toast
 * @param {Object} notification - Datos de la notificación
 */
function showToastNotification(notification) {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    // Crear contenido
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${notification.title}</span>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-body">${notification.message}</div>
        <div class="toast-actions">
            <button class="btn btn-small view-record" data-anumber="${notification.aNumber}">
                View Record
            </button>
        </div>
    `;
    
    // Añadir al body
    document.body.appendChild(toast);
    
    // Añadir event listeners
    toast.querySelector('.toast-close').addEventListener('click', function() {
        document.body.removeChild(toast);
    });
    
    toast.querySelector('.view-record').addEventListener('click', function() {
        viewRecord(notification.aNumber);
    });
    
    // Quitar automáticamente después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 5000);
}