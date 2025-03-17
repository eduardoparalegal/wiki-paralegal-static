document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const documentCards = document.querySelectorAll('.document-card');
    const documentationList = document.getElementById('documentation-list');
    const noResultsMessage = document.getElementById('no-results');
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    // Initialize an array to store document data for searching
    const documents = [];
    
    // Populate the documents array with data from the HTML
    documentCards.forEach(card => {
        // Obtener el título directamente del contenido HTML para asegurar que capturamos el texto real mostrado
        const titleElement = card.querySelector('h3') || card.querySelector('h2');
        const title = titleElement ? titleElement.textContent : '';
        
        // Obtener directamente el contenido completo visible de la tarjeta para la descripción
        const description = card.textContent || '';
        
        documents.push({
            element: card,
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            originalTitle: title // Guardamos el título original para referencia
        });
    });
    
    // Function to calculate similarity score between two strings
    function similarityScore(str1, str2) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        
        // Simple implementation of Levenshtein distance for fuzzy matching
        const matrix = [];
        
        // Initialize matrix
        for (let i = 0; i <= str1.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str2.length; j++) {
            matrix[0][j] = j;
        }
        
        // Fill matrix
        for (let i = 1; i <= str1.length; i++) {
            for (let j = 1; j <= str2.length; j++) {
                if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }
        
        // The final score is inversely proportional to the Levenshtein distance
        const maxLength = Math.max(str1.length, str2.length);
        if (maxLength === 0) return 1; // Both strings are empty
        
        // Return a similarity score between 0 and 1
        return 1 - (matrix[str1.length][str2.length] / maxLength);
    }
    
    // Function to check if a document contains a keyword
    function containsKeyword(doc, keyword) {
        keyword = keyword.toLowerCase();
        return doc.title.includes(keyword) || doc.description.includes(keyword);
    }
    
    // Function to perform search with similarity matching
    function performSearch(query) {
        query = query.toLowerCase().trim();
        console.log("Searching for:", query); // Para depuración
        
        // If the query is empty, show all documents
        if (query === '') {
            documents.forEach(doc => {
                doc.element.style.display = 'block';
            });
            noResultsMessage.style.display = 'none';
            return;
        }
        
        // Split the query into keywords
        const keywords = query.split(/\s+/);
        
        // Primera comprobación: imprimir todos los documentos para depuración
        console.log("Available documents:", documents.map(d => d.originalTitle));
        
        // First, try exact matching with individual keywords
        let exactMatches = documents.filter(doc => 
            keywords.some(keyword => containsKeyword(doc, keyword))
        );
        
        console.log("Exact matches:", exactMatches.map(d => d.originalTitle)); // Para depuración
        
        let hasResults = false;
        
        // If we have exact matches, use those
        if (exactMatches.length > 0) {
            documents.forEach(doc => {
                if (exactMatches.includes(doc)) {
                    doc.element.style.display = 'block';
                    hasResults = true;
                } else {
                    doc.element.style.display = 'none';
                }
            });
        } else {
            // Otherwise, use similarity matching
            const similarityThreshold = 0.3; // Bajamos el umbral para mayor tolerancia
            const results = [];
            
            documents.forEach(doc => {
                // Calculate best similarity score for the document
                let bestScore = 0;
                
                // Check title similarity
                const titleScore = similarityScore(query, doc.title);
                bestScore = Math.max(bestScore, titleScore);
                
                // Check description similarity
                const descScore = similarityScore(query, doc.description);
                bestScore = Math.max(bestScore, descScore);
                
                // Check individual keywords
                keywords.forEach(keyword => {
                    if (keyword.length > 1) { // Bajamos a 2+ caracteres para mayor sensibilidad
                        const keywordTitleScore = similarityScore(keyword, doc.title);
                        const keywordDescScore = similarityScore(keyword, doc.description);
                        bestScore = Math.max(bestScore, keywordTitleScore, keywordDescScore);
                    }
                });
                
                console.log(`Score for "${doc.originalTitle}": ${bestScore}`); // Para depuración
                
                // If the document's best score is above the threshold, include it
                if (bestScore >= similarityThreshold) {
                    results.push({
                        doc: doc,
                        score: bestScore
                    });
                }
            });
            
            // Sort results by score (descending)
            results.sort((a, b) => b.score - a.score);
            
            console.log("Similarity results:", results.map(r => `${r.doc.originalTitle} (${r.score})`)); // Para depuración
            
            // Display the results
            documents.forEach(doc => {
                doc.element.style.display = 'none';
            });
            
            results.forEach(result => {
                result.doc.element.style.display = 'block';
            });
            
            hasResults = results.length > 0;
        }
        
        // Show or hide the "no results" message based on whether we found any results
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
    
    // Add event listeners for search
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    // Real-time search as user types (with small delay)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(searchInput.value);
        }, 300); // 300ms delay to avoid too many searches while typing
    });
    
    // Download button functionality
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // The default link behavior will handle the download
            // This is just for any additional tracking or analytics
            const card = this.closest('.document-card');
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 
                        (card.querySelector('h2') ? card.querySelector('h2').textContent : 'Documento');
            console.log(`Downloading document: ${title}`);
        });
    });
    
    // Focus on search input when page loads for better UX
    searchInput.focus();
});