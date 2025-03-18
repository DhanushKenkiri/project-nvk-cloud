import { extractTextFromImage, extractTextFromPDF, extractTextFromDOCX } from './ocr.js';
import { analyzeWithGemini } from './gemini.js';
import { analyzeWithRAG } from './rag.js';

// Configure environment variables
const CONFIG = {
    API_URL: process.env.API_URL || 'http://localhost:3000/api'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// Set up event listeners
function initializeEventListeners() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    
    // Handle drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#7983ff';
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#666';
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#666';
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length) {
            handleFile(fileInput.files[0]);
        }
    });
}

// Function to handle the selected file
function handleFile(file) {
    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, DOCX, JPG, or PNG file.');
        return;
    }
    
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        return;
    }
    
    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'flex';
    document.getElementById('dropZone').style.display = 'none';
    
    // Process the file based on type
    if (file.type === 'application/pdf') {
        extractTextFromPDF(file, processExtractedText);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        extractTextFromDOCX(file, processExtractedText);
    } else {
        // For images, use Azure OCR (Tesseract implementation)
        extractTextFromImage(file, processExtractedText);
    }
}

// Function to process the extracted text
function processExtractedText(text, error) {
    if (error) {
        showError(error);
        return;
    }
    
    // Check if RAG is enabled
    const useRAG = document.getElementById('ragToggle').checked;
    
    if (useRAG) {
        analyzeWithRAG(text, displayResults);
    } else {
        analyzeWithGemini(text, displayResults);
    }
}

// Function to display results
function displayResults(results, error) {
    if (error) {
        showError(error);
        return;
    }
    
    // Extract results sections
    const { generalAnalysis, contractSummary, riskAssessment } = results;
    
    // Format and display the results
    document.getElementById('generalAnalysisResult').innerHTML = formatAnalysisContent(generalAnalysis);
    document.getElementById('contractSummaryResult').innerHTML = formatAnalysisContent(contractSummary);
    document.getElementById('riskAssessmentResult').innerHTML = formatAnalysisContent(riskAssessment);
    
    // Hide loading, show results
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
}

// Function to show result tabs
window.showResultTab = function(tabId) {
    // Hide all result contents
    document.querySelectorAll('.result-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all result tabs
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected result content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to selected result tab
    document.querySelectorAll('.result-tab').forEach(tab => {
        if (tab.textContent.trim().includes(tabId.replace('-', ' '))) {
            tab.classList.add('active');
        }
    });
}

// Helper function to format analysis content
function formatAnalysisContent(content) {
    // Replace newlines with paragraph breaks
    content = content.replace(/\n\n/g, '</p><p>');
    
    // Convert bullet points to HTML lists
    content = content.replace(/\n\s*[-•]\s+/g, '<li>');
    if (content.includes('<li>')) {
        content = content.replace(/<li>/, '<ul><li>') + '</ul>';
    }
    
    // Wrap in paragraphs if not already
    if (!content.startsWith('<p>')) {
        content = '<p>' + content + '</p>';
    }
    
    return content;
}

// Function to show error
function showError(message) {
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('dropZone').style.display = 'flex';
    alert(message);
}

export { CONFIG };