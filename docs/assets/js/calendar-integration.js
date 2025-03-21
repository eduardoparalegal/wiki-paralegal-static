// Google Calendar API integration
const API_KEY = 'AIzaSyCmuCosxzJhNmjA4hNxxXPjnnPJ3rCP3Vs';
const CLIENT_ID = '740116957784-41b21d20us8fdk9flnkbsq3hhotroqio.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Initialize the Google API client
export function initializeGoogleCalendar() {
  // Load the Google API client library
  const script1 = document.createElement('script');
  script1.src = 'https://apis.google.com/js/api.js';
  script1.onload = gapiLoaded;
  document.head.appendChild(script1);

  // Load the Google Identity Services library
  const script2 = document.createElement('script');
  script2.src = 'https://accounts.google.com/gsi/client';
  script2.onload = gisLoaded;
  document.head.appendChild(script2);
}

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // Will be set later
  });
  gisInited = true;
}

// Create a calendar event for a reminder
export async function createReminder(clientA, note, reminderDateTime) {
  if (!gapiInited || !gisInited) {
    console.error('Google API not initialized');
    return { success: false, message: 'Error: Google Calendar API no inicializada' };
  }

  return new Promise((resolve) => {
    // Set up the callback for getting the auth token
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        resolve({ success: false, message: 'Error de autenticación: ' + resp.error });
        return;
      }

      try {
        // Create the calendar event
        const event = {
          'summary': `Recordatorio para cliente A# ${clientA}`,
          'description': note,
          'start': {
            'dateTime': reminderDateTime,
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          'end': {
            'dateTime': new Date(new Date(reminderDateTime).getTime() + 30 * 60000).toISOString(), // 30 minutes later
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60}, // 1 day before
              {'method': 'popup', 'minutes': 30} // 30 minutes before
            ]
          }
        };

        const request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        });

        const response = await new Promise((res, rej) => {
          request.execute(resp => res(resp));
        });

        if (response.error) {
          resolve({ success: false, message: 'Error al crear recordatorio: ' + response.error.message });
        } else {
          resolve({ 
            success: true, 
            message: 'Recordatorio creado exitosamente', 
            eventId: response.id,
            eventLink: response.htmlLink
          });
        }
      } catch (error) {
        resolve({ success: false, message: 'Error al crear recordatorio: ' + error.message });
      }
    };

    // Check if we're already signed in and have the right scopes
    if (gapi.client.getToken() === null) {
      // Prompt the user to select an account and authorize
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip the consent prompt if already authenticated
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
}

// Update a calendar event
export async function updateReminder(eventId, clientA, note, reminderDateTime) {
  if (!gapiInited || !gisInited) {
    console.error('Google API not initialized');
    return { success: false, message: 'Error: Google Calendar API no inicializada' };
  }

  return new Promise((resolve) => {
    // Set up the callback for getting the auth token
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        resolve({ success: false, message: 'Error de autenticación: ' + resp.error });
        return;
      }

      try {
        // Update the calendar event
        const event = {
          'summary': `Recordatorio para cliente A# ${clientA}`,
          'description': note,
          'start': {
            'dateTime': reminderDateTime,
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          'end': {
            'dateTime': new Date(new Date(reminderDateTime).getTime() + 30 * 60000).toISOString(), // 30 minutes later
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60}, // 1 day before
              {'method': 'popup', 'minutes': 30} // 30 minutes before
            ]
          }
        };

        const request = gapi.client.calendar.events.update({
          'calendarId': 'primary',
          'eventId': eventId,
          'resource': event
        });

        const response = await new Promise((res, rej) => {
          request.execute(resp => res(resp));
        });

        if (response.error) {
          resolve({ success: false, message: 'Error al actualizar recordatorio: ' + response.error.message });
        } else {
          resolve({ 
            success: true, 
            message: 'Recordatorio actualizado exitosamente', 
            eventId: response.id,
            eventLink: response.htmlLink
          });
        }
      } catch (error) {
        resolve({ success: false, message: 'Error al actualizar recordatorio: ' + error.message });
      }
    };

    // Check if we're already signed in and have the right scopes
    if (gapi.client.getToken() === null) {
      // Prompt the user to select an account and authorize
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip the consent prompt if already authenticated
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
}

// Delete a calendar event
export async function deleteReminder(eventId) {
  if (!gapiInited || !gisInited) {
    console.error('Google API not initialized');
    return { success: false, message: 'Error: Google Calendar API no inicializada' };
  }

  return new Promise((resolve) => {
    // Set up the callback for getting the auth token
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        resolve({ success: false, message: 'Error de autenticación: ' + resp.error });
        return;
      }

      try {
        const request = gapi.client.calendar.events.delete({
          'calendarId': 'primary',
          'eventId': eventId
        });

        const response = await new Promise((res, rej) => {
          request.execute(resp => res(resp));
        });

        if (response && response.error) {
          resolve({ success: false, message: 'Error al eliminar recordatorio: ' + response.error.message });
        } else {
          resolve({ success: true, message: 'Recordatorio eliminado exitosamente' });
        }
      } catch (error) {
        resolve({ success: false, message: 'Error al eliminar recordatorio: ' + error.message });
      }
    };

    // Check if we're already signed in and have the right scopes
    if (gapi.client.getToken() === null) {
      // Prompt the user to select an account and authorize
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip the consent prompt if already authenticated
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
}

// Initialize the Google Calendar API when the document loads
document.addEventListener('DOMContentLoaded', initializeGoogleCalendar);