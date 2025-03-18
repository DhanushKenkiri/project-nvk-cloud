import { CONFIG } from './app.js';
import axios from 'axios';

// Function to analyze text with RAG
export async function analyzeWithRAG(text, callback) {
    try {
        // First, send the document to the RAG system to index it
        const indexResponse = await axios.post(`${CONFIG.API_URL}/rag/index`, {
            document: text
        });
        
        if (!indexResponse.data || !indexResponse.data.documentId) {
            throw new Error('Failed to index document');
        }
        
        const documentId = indexResponse.data.documentId;
        
        // Now query the RAG system for enhanced analysis
        const queries = [
            "Provide a general analysis of this document.",
            "Summarize this contract including parties, terms, and obligations.",
            "Identify potential risks, issues, and missing clauses in this document."
        ];
        
        // Create promises for all three queries
        const queryPromises = queries.map(query => 
            axios.post(`${CONFIG.API_URL}/rag/query`, {
                query: query,
                documentId: documentId
            })
        );
        
        // Wait for all queries to complete
        const responses = await Promise.all(queryPromises);
        
        // Process the results
        const results = {
            generalAnalysis: responses[0].data.response,
            contractSummary: responses[1].data.response,
            riskAssessment: responses[2].data.response
        };
        
        callback(results);
        
    } catch (error) {
        console.error('Error with RAG system:', error);
        callback(null, 'Error with RAG analysis. Please try again.');
    }
}