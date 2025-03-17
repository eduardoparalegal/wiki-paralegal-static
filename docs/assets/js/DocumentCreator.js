// Define DHS addresses mapping
const dhsAddresses = {
    "SEATTLE, WA": "915 Second Avenue, Suite 708, Seattle, WA 98174",
    "SAN FRANCISCO, CA": "100 Montgomery Street, Suite 200, San Francisco, CA 94104",
    "CONCORD, CA": "100 Montgomery Street, Suite 200, San Francisco, CA 94104",
    "LOS ANGELES, CA": "300 North Los Angeles Street, Room 7631, Los Angeles, CA 90012",
    "DALLAS, TX": "125 E. John Carpenter Freeway, Suite 500, Irving, TX 75062",
    "HOUSTON, TX": "126 Northpoint Drive, Houston, TX 77060",
    "NEW YORK, NY": "26 Federal Plaza, Room 11-102, New York, NY 10278",
    "MIAMI, FL": "333 S. Miami Ave, Suite 200, Miami, FL 33130",
    "CHICAGO, IL": "525 West Van Buren Street, Suite 701, Chicago, IL 60607"
};

// DOM Elements
const courtLocationSelect = document.getElementById('courtLocation');
const clientNameInput = document.getElementById('clientName');
const aNumberInputs = document.querySelectorAll('.a-number');
const judgeNameInput = document.getElementById('judgeName');
const hearingDateInput = document.getElementById('hearingDate');
const hearingTimeInput = document.getElementById('hearingTime');
const previewBtn = document.getElementById('previewBtn');
const generateBtn = document.getElementById('generateBtn');
const previewContainer = document.getElementById('previewContainer');

// Preview elements
const previewCourtLocation = document.getElementById('previewCourtLocation');
const previewClientName = document.getElementById('previewClientName');
const previewANumbers = document.getElementById('previewANumbers');
const previewJudge = document.getElementById('previewJudge');
const previewHearingDateTime = document.getElementById('previewHearingDateTime');
const previewDHSAddress = document.getElementById('previewDHSAddress');
const currentDateElement = document.getElementById('currentDate');

// Set current date
const today = new Date();
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
currentDateElement.textContent = formattedDate;

// Format A# inputs
aNumberInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        // Remove non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Format as XXX-XXX-XXX
        if (value.length > 0) {
            if (value.length <= 3) {
                this.value = value;
            } else if (value.length <= 6) {
                this.value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                this.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 9);
            }
        }
    });
});

// Court location change handler
courtLocationSelect.addEventListener('change', function() {
    const selectedLocation = this.value;
    if (selectedLocation in dhsAddresses) {
        previewDHSAddress.textContent = dhsAddresses[selectedLocation];
    }
});

// Preview button click handler
previewBtn.addEventListener('click', function() {
    // Update preview elements
    previewCourtLocation.textContent = courtLocationSelect.value;
    previewClientName.textContent = clientNameInput.value;
    previewJudge.textContent = judgeNameInput.value;
    
   // Format and set A# numbers
let aNumbers = [];
aNumberInputs.forEach((input, index) => {
    if (input.value.trim()) {
        aNumbers.push(input.value);
    }
});

if (aNumbers.length > 0) {
    let formattedANumbers;
    if (aNumbers.length === 1) {
        formattedANumbers = aNumbers[0];
    } else if (aNumbers.length <= 3) {
        formattedANumbers = aNumbers.join(', ');
    } else {
        // Format A# numbers with line breaks for more than 3 numbers
        const firstLine = aNumbers.slice(0, 2).join(', ') + ',';
        let remainingLines = [];
        
        for (let i = 2; i < aNumbers.length; i += 2) {
            if (i + 1 < aNumbers.length) {
                remainingLines.push(aNumbers.slice(i, i + 2).join(', ') + (i + 2 < aNumbers.length ? ',' : ''));
            } else {
                remainingLines.push(aNumbers[i]);
            }
        }
        
        formattedANumbers = firstLine + '<br>' + remainingLines.join('<br>');
    }
    previewANumbers.innerHTML = formattedANumbers;
}

// Format and set hearing date and time
if (hearingDateInput.value && hearingTimeInput.value) {
    const hearingDate = new Date(hearingDateInput.value);
    const month = String(hearingDate.getMonth() + 1).padStart(2, '0');
    const day = String(hearingDate.getDate()).padStart(2, '0');
    const year = hearingDate.getFullYear();
    
    // Convert time to 12-hour format with AM/PM
    const timeValue = hearingTimeInput.value;
    const timeParts = timeValue.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const formattedTime = `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    const formattedDateTime = `${month}/${day}/${year} ${formattedTime}`;
    
    previewHearingDateTime.textContent = formattedDateTime;
}

// Show preview container
previewContainer.style.display = 'block';
});

// Generate document function
generateBtn.addEventListener('click', async function() {
    // First validate the form
    if (!validateForm()) {
        alert('Please complete all required fields before generating the document.');
        return;
    }
    
    try {
        // Load the template document
        const templateUrl = 'Motion-to-Substitute-Template.docx'; // Make sure this file exists in your server
        const templateFile = await fetch(templateUrl).then(res => res.arrayBuffer());
        
        // Prepare data for document generation
        const data = prepareDocumentData();
        
        // Generate document using docxtemplater
        const doc = generateDocxFromTemplate(templateFile, data);
        
        // Save and download the document
        const outputBlob = doc.getZip().generate({type: 'blob'});
        saveAs(outputBlob, `Motion-to-Substitute-${data.clientName.replace(/\s+/g, '-')}.docx`);
        
        alert('Document generated successfully!');
    } catch (error) {
        console.error('Error generating document:', error);
        alert('Error generating document. Please try again.');
    }
});

// Validate form inputs
function validateForm() {
    if (!courtLocationSelect.value) return false;
    if (!clientNameInput.value) return false;
    if (!aNumberInputs[0].value) return false; // At least one A# required
    if (!judgeNameInput.value) return false;
    if (!hearingDateInput.value || !hearingTimeInput.value) return false;
    return true;
}

// Prepare data for document generation
function prepareDocumentData() {
    // Format A# numbers
    let aNumbers = [];
    aNumberInputs.forEach(input => {
        if (input.value.trim()) {
            aNumbers.push(input.value);
        }
    });
    
    let formattedANumbers = '';
    if (aNumbers.length === 1) {
        formattedANumbers = aNumbers[0];
    } else {
        formattedANumbers = formatMultipleANumbers(aNumbers);
    }
    
    // Format hearing date and time
    const hearingDate = new Date(hearingDateInput.value);
    const month = String(hearingDate.getMonth() + 1).padStart(2, '0');
    const day = String(hearingDate.getDate()).padStart(2, '0');
    const year = hearingDate.getFullYear();
    
    // Convert time to 12-hour format with AM/PM
    const timeValue = hearingTimeInput.value;
    const timeParts = timeValue.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const formattedTime = `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    const formattedDateTime = `${month}/${day}/${year} ${formattedTime}`;
    
    // Get current date for proof of service
    const today = new Date();
    const currentDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    return {
        courtLocation: courtLocationSelect.value,
        clientName: clientNameInput.value,
        aNumbers: formattedANumbers,
        judgeName: judgeNameInput.value,
        hearingDateTime: formattedDateTime,
        currentDate: currentDate,
        dhsAddress: dhsAddresses[courtLocationSelect.value] || ''
    };
}

// Format multiple A# numbers with proper line breaks
function formatMultipleANumbers(aNumbers) {
    if (aNumbers.length <= 3) {
        return aNumbers.join(', ');
    }
    
    // Format with proper line breaks for Word document
    // This will create a string with line breaks that Word can handle
    const firstLine = aNumbers.slice(0, 2).join(', ') + ',';
    let remainingLines = [];
    
    for (let i = 2; i < aNumbers.length; i += 2) {
        if (i + 1 < aNumbers.length) {
            remainingLines.push(aNumbers.slice(i, i + 2).join(', ') + (i + 2 < aNumbers.length ? ',' : ''));
        } else {
            remainingLines.push(aNumbers[i]);
        }
    }
    
    return firstLine + '\n' + remainingLines.join('\n');
}

// Generate DOCX from template
function generateDocxFromTemplate(templateFile, data) {
    // Load the docx file as a binary
    const zip = new PizZip(templateFile);
    
    // Initialize docxtemplater with the template
    const doc = new window.docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
    });
    
    // Set the templateVariables
    doc.setData({
        court_location: data.courtLocation,
        client_name: data.clientName,
        a_numbers: data.aNumbers,
        judge_name: data.judgeName,
        hearing_date_time: data.hearingDateTime,
        current_date: data.currentDate,
        dhs_address: data.dhsAddress
    });
    
    try {
        // Render the document (replace all variables with their values)
        doc.render();
    } catch (error) {
        console.error('Error rendering document:', error);
        throw error;
    }
    
    return doc;
}

// Load helper functions for file loading
function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

// Initialize date fields with current date
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    const formattedDate = nextMonth.toISOString().split('T')[0];
    hearingDateInput.value = formattedDate;
    hearingTimeInput.value = '09:00';
});

// This is a helper script to convert your original DOCX to a template
// You would run this once to create the template file

document.addEventListener('DOMContentLoaded', function() {
    // Add a button for template conversion
    const convertButton = document.createElement('button');
    convertButton.textContent = 'Convert Document to Template';
    convertButton.style.marginTop = '20px';
    convertButton.style.display = 'block';
    convertButton.addEventListener('click', convertToTemplate);
    
    document.querySelector('.container').appendChild(convertButton);
    
    // Hide this when in production
    convertButton.style.display = 'none';
});

async function convertToTemplate() {
    try {
        // Load the original document
        const originalDocUrl = 'Motion-to-Substitute-YULI.docx';
        const originalDoc = await fetch(originalDocUrl).then(res => res.arrayBuffer());
        
        // Load as zip
        const zip = new PizZip(originalDoc);
        
        // Get the document.xml content
        let content = zip.file('word/document.xml').asText();
        
        // Replace the immigration court location
        content = content.replace(
            /CONCORD, CA/g,
            '{court_location}'
        );
        
        // Replace client name
        content = content.replace(
            /Nacer Josue Garcia Blandon/g,
            '{client_name}'
        );
        
        // Replace A# numbers
        content = content.replace(
            /A# 220-866-625/g,
            'A# {a_numbers}'
        );
        
        // Replace judge name and hearing date/time
        content = content.replace(
            /IJ Eichenberger, 09\/16\/2026 01:00 PM/g,
            'IJ {judge_name}, {hearing_date_time}'
        );
        
        // Replace DHS address in the proof of service
        content = content.replace(
            /100 Montgomery Street, Suite 200, San Francisco, CA 94104/g,
            '{dhs_address}'
        );
        
        // Replace the current date in proof of service
        content = content.replace(
            /3\/12\/25/g,
            '{current_date}'
        );
        
        // Update the content in the zip
        zip.file('word/document.xml', content);
        
        // Generate the template document
        const outputBlob = zip.generate({type: 'blob'});
        saveAs(outputBlob, 'Motion-to-Substitute-Template.docx');
        
        alert('Template document created successfully!');
    } catch (error) {
        console.error('Error creating template:', error);
        alert('Error creating template document.');
    }
}