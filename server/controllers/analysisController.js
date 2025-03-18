const geminiService = require('../services/geminiService');
const ragService = require('../services/ragService');

// Controller for analysis operations
const analysisController = {
    // Analyze text with Gemini API
    analyzeWithGemini: async (req, res) => {
        try {
            const { text } = req.body;
            
            if (!text) {
                return res.status(400).json({ error: 'No text provided for analysis' });
            }
            
            // Call Gemini API for analysis
            const analysis = await geminiService.analyzeText(text);
            
            res.status(200).json({ results: analysis });
            
        } catch (error) {
            console.error('Error in Gemini analysis:', error);
            res.status(500).json({ error: 'Failed to analyze text with Gemini' });
        }
    },
    
    // Index document for RAG
    indexForRAG: async (req, res) => {
        try {
            const { document } = req.body;
            
            if (!document) {
                return res.status(400).json({ error: 'No document provided for indexing' });
            }
            
            // Index document with RAG service
            const result = await ragService.indexDocument(document);
            
            res.status(200).json({ documentId: result.documentId });
            
        } catch (error) {
            console.error('Error in RAG indexing:', error);
            res.status(500).json({ error: 'Failed to index document for RAG' });
        }
    },
    
    // Query RAG system
    queryRAG: async (req, res) => {
        try {
            const { query, documentId } = req.body;
            
            if (!query || !documentId) {
                return res.status(400).json({ error: 'Query and documentId are required' });
            }
            
            // Query RAG system
            const response = await ragService.queryDocument(query, documentId);
            
            res.status(200).json({ response });
            
        } catch (error) {
            console.error('Error in RAG query:', error);
            res.status(500).json({ error: 'Failed to query RAG system' });
        }
    }
};

module.exports = analysisController;