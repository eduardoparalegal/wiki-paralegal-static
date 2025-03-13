document.addEventListener('DOMContentLoaded', function() {
    // Button click handlers
    const openButtons = document.querySelectorAll('.btn-open');
    const downloadButtons = document.querySelectorAll('.btn-download');

    // Open button functionality - redirect to another page
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the title of the document from the parent card
            const card = this.closest('.document-card');
            const title = card.querySelector('h3').textContent;
            
            // Create a URL-friendly version of the title (replace spaces with hyphens and lowercase)
            const urlTitle = title.toLowerCase().replace(/\s+/g, '-');
            
            // Redirect to the document page
            window.location.href = `/documents/${urlTitle}.html`;
            
            // If you want to use IDs instead of titles, you could do something like:
            // const documentId = this.getAttribute('data-document-id');
            // window.location.href = `/documents/${documentId}`;
        });
    });

    // Download button functionality - trigger download
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the title of the document from the parent card
            const card = this.closest('.document-card');
            const title = card.querySelector('h3').textContent;
            
            // Create a URL-friendly version of the title
            const urlTitle = title.toLowerCase().replace(/\s+/g, '-');
            
            // Create a link element to trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = `/downloads/${urlTitle}.pdf`; // Assuming PDFs, adjust as needed
            downloadLink.download = `${title}.pdf`;
            
            // Append to the body, click it, and remove it
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Alternative method: redirect to a download endpoint
            // window.location.href = `/api/download/${urlTitle}`;
        });
    });

    // Hover effects for cards
    const documentCards = document.querySelectorAll('.document-card');
    documentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(255, 255, 255, 0.1)';
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
            this.style.transform = 'translateY(0)';
            this.style.transition = 'all 0.3s ease';
        });
    });
});