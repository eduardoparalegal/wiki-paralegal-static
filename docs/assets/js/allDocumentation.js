document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const documentCards = document.querySelectorAll('.document-card');
    const documentationList = document.getElementById('documentation-list');
    const noResultsMessage = document.getElementById('no-results');
    const downloadButtons = document.querySelectorAll('.btn-download');
    const sortButton = document.getElementById('sort-button');
    const sortDropdown = document.getElementById('sort-dropdown');
    const sortOptions = document.querySelectorAll('.sort-dropdown a');
    
    
    // Initialize an array to store document data for searching and sorting
    const documents = [];
    
    // Parse date string in format MM/DD/YYYY to Date object
    function parseDate(dateStr) {
        if (!dateStr) return null;
        const parts = dateStr.replace('.', '').split('/');
        // MM/DD/YYYY format
        if (parts.length === 3) {
            return new Date(parts[2], parts[0] - 1, parts[1]);
        }
        return null;
    }
    
    // Populate the documents array with data from the HTML
    documentCards.forEach(card => {
        const titleElement = card.querySelector('h3') || card.querySelector('h2');
        const title = titleElement ? titleElement.textContent : '';
        const dateElement = card.querySelector('p');
        let dateStr = '';
        let dateObj = null;
        
        if (dateElement) {
            const dateMatch = dateElement.textContent.match(/(\d{2}\/\d{2}\/\d{4})/);
            if (dateMatch) {
                dateStr = dateMatch[0];
                dateObj = parseDate(dateStr);
            }
        }
        
        // Also look for date in data attribute
        const dataDate = card.getAttribute('data-date');
        if (dataDate && !dateObj) {
            dateStr = dataDate;
            dateObj = parseDate(dataDate);
        }
        
        const description = card.textContent || '';
        
        documents.push({
            element: card,
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            dateStr: dateStr,
            date: dateObj,
            originalTitle: title
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
    
    // Sort dropdown toggle
    sortButton.addEventListener('click', function() {
        sortDropdown.style.display = sortDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!sortButton.contains(e.target) && !sortDropdown.contains(e.target)) {
            sortDropdown.style.display = 'none';
        }
    });
    
    // Handle sort option selection
    sortOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active class
            sortOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update button text
            const sortType = this.getAttribute('data-sort');
            if (sortType === 'newest') {
                sortButton.innerHTML = '<i class="fas fa-sort-amount-down"></i> Newest First <i class="fas fa-chevron-down"></i>';
            } else {
                sortButton.innerHTML = '<i class="fas fa-sort-amount-up"></i> Oldest First <i class="fas fa-chevron-down"></i>';
            }
            
            // Perform sorting
            sortDocuments(sortType);
            
            // Close dropdown
            sortDropdown.style.display = 'none';
        });
    });
    
    // Function to sort documents based on date
    function sortDocuments(sortType) {
        // Sort documents array
        const sortedDocs = [...documents].sort((a, b) => {
            // Handle missing dates - put them at the bottom
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            
            // Newest first (default)
            if (sortType === 'newest') {
                return b.date - a.date;
            } 
            // Oldest first
            else {
                return a.date - b.date;
            }
        });
        
        // Reorder DOM elements
        const fragment = document.createDocumentFragment();
        sortedDocs.forEach(doc => {
            fragment.appendChild(doc.element);
        });
        
        documentationList.innerHTML = '';
        documentationList.appendChild(fragment);
    }
    
    // Function to perform search with similarity matching
    function performSearch(query) {
        query = query.toLowerCase().trim();
        
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
        
        // First, try exact matching with individual keywords
        let exactMatches = documents.filter(doc => 
            keywords.some(keyword => containsKeyword(doc, keyword))
        );
        
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
            const similarityThreshold = 0.3;
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
                    if (keyword.length > 1) {
                        const keywordTitleScore = similarityScore(keyword, doc.title);
                        const keywordDescScore = similarityScore(keyword, doc.description);
                        bestScore = Math.max(bestScore, keywordTitleScore, keywordDescScore);
                    }
                });
                
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
            const card = this.closest('.document-card');
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 
                        (card.querySelector('h2') ? card.querySelector('h2').textContent : 'Documento');
            console.log(`Downloading document: ${title}`);
        });
    });
    
    // Sort documents by newest first (default)
    sortDocuments('newest');
    
    // Focus on search input when page loads for better UX
    searchInput.focus();
});