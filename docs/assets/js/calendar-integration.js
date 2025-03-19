// Calendar Integration with Google Calendar API
import { showMessage } from './mts.js';

// Client ID and API key from the Google Cloud Console
const CLIENT_ID = '740116957784-41b21d20us8fdk9flnkbsq3hhotroqio.apps.googleusercontent.com';
const API_KEY = ''; // Añadir tu API key aquí si la tienes

// API discovery doc URL and scopes
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// DOM Elements
const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const calendarContent = document.getElementById('calendar-content');
const calendarEventsList = document.getElementById('calendar-events-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Google API client
    initializeGapiClient();
    
    // Initialize the Google Identity Services client
    initializeGisClient();
    
    // Add event listeners for calendar tab buttons
    if (authorizeButton) {
        authorizeButton.addEventListener('click', handleAuthClick);
    }
    
    if (signoutButton) {
        signoutButton.addEventListener('click', handleSignoutClick);
    }
    
    // If the calendar tab is selected, load calendar events
    const calendarTab = document.querySelector('[data-tab="calendar"]');
    if (calendarTab) {
        calendarTab.addEventListener('click', function() {
            // Check if the user is authenticated
            if (gapi && gapi.client && gapi.client.getToken() !== null) {
                loadCalendarEvents();
            }
        });
    }
});

/**
 * Callback after the API client is loaded. Loads the discovery doc to initialize the API.
 */
function initializeGapiClient() {
    if (!window.gapi) {
        console.error('Google API client library not loaded');
        return;
    }
    
    gapi.load('client', async () => {
        try {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        } catch (error) {
            console.error('Error initializing GAPI client', error);
        }
    });
}

/**
 * Callback after Google Identity Services are loaded.
 */
function initializeGisClient() {
    if (!window.google || !google.accounts || !google.accounts.oauth2) {
        console.error('Google Identity Services not loaded');
        return;
    }
    
    try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    } catch (error) {
        console.error('Error initializing Google Identity Services client', error);
    }
}

/**
 * Enable buttons if both GAPI and GIS are initialized.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited && authorizeButton) {
        authorizeButton.disabled = false;
        
        // Check if the user is already authenticated
        if (gapi.client.getToken() !== null) {
            authorizeButton.classList.add('hidden');
            if (signoutButton) signoutButton.classList.remove('hidden');
            if (calendarContent) calendarContent.classList.remove('hidden');
            loadCalendarEvents();
        }
    }
}

/**
 * Handle the auth button click.
 */
function handleAuthClick() {
    if (!tokenClient) {
        console.error('Token client not initialized');
        return;
    }
    
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            showMessage('Error authenticating with Google: ' + resp.error, 'error');
            return;
        }
        
        if (authorizeButton) authorizeButton.classList.add('hidden');
        if (signoutButton) signoutButton.classList.remove('hidden');
        if (calendarContent) calendarContent.classList.remove('hidden');
        
        // Load calendar events
        await loadCalendarEvents();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and consent to OAuth scopes
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        // Skip display of account chooser and consent dialog
        tokenClient.requestAccessToken({prompt: ''});
    }
}

/**
 * Handle the sign-out button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        if (authorizeButton) authorizeButton.classList.remove('hidden');
        if (signoutButton) signoutButton.classList.add('hidden');
        if (calendarContent) calendarContent.classList.add('hidden');
        if (calendarEventsList) calendarEventsList.innerHTML = '';
    }
}

/**
 * Load calendar events for the current user.
 */
async function loadCalendarEvents() {
    if (!calendarEventsList) return;
    
    try {
        // Get upcoming events related to A# reminders
        const response = await gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
            'q': 'A#:'
        });

        const events = response.result.items;
        
        // Clear previous events
        calendarEventsList.innerHTML = '';
        
        // Display events
        if (events.length === 0) {
            calendarEventsList.innerHTML = '<p>No upcoming reminders found.</p>';
            return;
        }
        
        // Create a list of events
        const ul = document.createElement('ul');
        ul.className = 'events-list';
        
        events.forEach((event) => {
            const li = document.createElement('li');
            li.className = 'event-item';
            
            // Format date and time
            const start = event.start.dateTime || event.start.date;
            const date = new Date(start);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Extract A# from summary if present
            let aNumber = '';
            const match = event.summary.match(/A#:\s*(\d{3}-\d{3}-\d{3})/);
            if (match && match[1]) {
                aNumber = match[1];
            }
            
            // Create event HTML
            li.innerHTML = `
                <div class="event-header">
                    <span class="event-title">${event.summary}</span>
                    <span class="event-time">${formattedDate} at ${formattedTime}</span>
                </div>
                <div class="event-description">${event.description || 'No description provided'}</div>
                <div class="event-actions">
                    <button class="btn btn-small" onclick="window.open('${event.htmlLink}', '_blank')">View in Calendar</button>
                    ${aNumber ? `<button class="btn btn-small" onclick="window.location.href='index.html?aNumber=${aNumber}'">View Record</button>` : ''}
                </div>
            `;
            
            ul.appendChild(li);
        });
        
        calendarEventsList.appendChild(ul);
        
    } catch (error) {
        console.error('Error loading calendar events:', error);
        calendarEventsList.innerHTML = `<p class="error">Error loading events: ${error.message}</p>`;
    }
}

/**
 * Add an event to Google Calendar.
 * @param {string} title - Event title
 * @param {string} description - Event description
 * @param {string} date - Event date in YYYY-MM-DD format
 * @param {string} time - Event time in HH:MM format
 * @returns {Promise<string>} - Promise that resolves to the created event ID
 */
export async function addEventToCalendar(title, description, date, time) {
    // Ensure the user is authenticated
    if (!window.gapi || !gapi.client || gapi.client.getToken() === null) {
        try {
            await requestCalendarAccess();
        } catch (error) {
            throw new Error('User not authenticated with Google Calendar');
        }
    }
    
    try {
        // Parse date and time
        const [year, month, day] = date.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);
        
        // Create start and end times
        const startDateTime = new Date(year, month - 1, day, hour, minute);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Add 1 hour
        
        // Create event
        const event = {
            'summary': title,
            'description': description,
            'start': {
                'dateTime': startDateTime.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': endDateTime.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'popup', 'minutes': 60},
                    {'method': 'email', 'minutes': 120}
                ]
            }
        };
        
        // Insert event to primary calendar
        const response = await gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
        
        console.log('Event created: %s', response.result.htmlLink);
        return response.result.id;
        
    } catch (error) {
        console.error('Error adding event to calendar', error);
        throw error;
    }
}

/**
 * Update an existing event in Google Calendar.
 * @param {string} eventId - ID of the event to update
 * @param {string} title - Updated event title
 * @param {string} description - Updated event description
 * @param {string} date - Updated event date in YYYY-MM-DD format
 * @param {string} time - Updated event time in HH:MM format
 * @returns {Promise<void>}
 */
export async function updateCalendarEvent(eventId, title, description, date, time) {
    // Ensure the user is authenticated
    if (!window.gapi || !gapi.client || gapi.client.getToken() === null) {
        try {
            await requestCalendarAccess();
        } catch (error) {
            throw new Error('User not authenticated with Google Calendar');
        }
    }
    
    try {
        // First, get the existing event
        const response = await gapi.client.calendar.events.get({
            'calendarId': 'primary',
            'eventId': eventId
        });
        
        const existingEvent = response.result;
        
        // Parse date and time
        const [year, month, day] = date.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);
        
        // Create start and end times
        const startDateTime = new Date(year, month - 1, day, hour, minute);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Add 1 hour
        
        // Update event properties
        existingEvent.summary = title;
        existingEvent.description = description;
        existingEvent.start.dateTime = startDateTime.toISOString();
        existingEvent.end.dateTime = endDateTime.toISOString();
        
        // Update event
        await gapi.client.calendar.events.update({
            'calendarId': 'primary',
            'eventId': eventId,
            'resource': existingEvent
        });
        
        console.log('Event updated: %s', existingEvent.htmlLink);
        
    } catch (error) {
        console.error('Error updating calendar event', error);
        throw error;
    }
}

/**
 * Delete an event from Google Calendar.
 * @param {string} eventId - ID of the event to delete
 * @returns {Promise<void>}
 */
export async function deleteCalendarEvent(eventId) {
    // Ensure the user is authenticated
    if (!window.gapi || !gapi.client || gapi.client.getToken() === null) {
        try {
            await requestCalendarAccess();
        } catch (error) {
            throw new Error('User not authenticated with Google Calendar');
        }
    }
    
    try {
        // Delete the event
        await gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': eventId
        });
        
        console.log('Event deleted: %s', eventId);
        
    } catch (error) {
        console.error('Error deleting calendar event', error);
        throw error;
    }
}

/**
 * Request calendar access from the user.
 * @returns {Promise<void>}
 */
async function requestCalendarAccess() {
    return new Promise((resolve, reject) => {
        if (!tokenClient) {
            console.error('Token client not initialized');
            reject(new Error('Token client not initialized'));
            return;
        }
        
        tokenClient.callback = (resp) => {
            if (resp.error !== undefined) {
                console.error('Error getting access token', resp);
                reject(new Error('Error getting access token: ' + resp.error));
                return;
            }
            resolve();
        };
        
        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and consent to OAuth scopes
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog
            tokenClient.requestAccessToken({prompt: ''});
        }
    });
}

/**
 * Check if the user has calendar access.
 * @returns {boolean}
 */
export function hasCalendarAccess() {
    return window.gapi && gapi.client && gapi.client.getToken() !== null;
}

/**
 * Initialize the calendar integration.
 * This function should be called when the application starts.
 */
export function initCalendarIntegration() {
    // Initialize the Google API client
    initializeGapiClient();
    
    // Initialize the Google Identity Services client
    initializeGisClient();
}