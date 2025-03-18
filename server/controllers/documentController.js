const Document = require('../models/Document');

// Controller for document operations
const documentController = {
    // Save document metadata and analysis results
    saveDocument: async (req, res) => {
        try {
            const { documentText, analysisResults, documentName, documentType } = req.body;
            
            if (!documentText || !analysisResults) {
                return res.status(400).json({ error: 'Document text and analysis results are required' });
            }
            
            // Create new document record
            const document = new Document({
                name: documentName || 'Untitled Document',
                type: documentType || 'Unknown',
                text: documentText,
                analysis: analysisResults,
                createdAt: new Date()
            });
            
            // Save to database
            await document.save();
            
            res.status(201).json({ documentId: document.id });
            
        } catch (error) {
            console.error('Error saving document:', error);
            res.status(500).json({ error: 'Failed to save document' });
        }
    },
    
    // Get document by ID
    getDocument: async (req, res) => {
        try {
            const documentId = req.params.id;
            
            if (!documentId) {
                return res.status(400).json({ error: 'Document ID is required' });
            }
            
            // Find document by ID
            const document = await Document.findById(documentId);
            
            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }
            
            res.status(200).json({ document });
            
        } catch (error) {
            console.error('Error retrieving document:', error);
            res.status(500).json({ error: 'Failed to retrieve document' });
        }
    },
    
    // Get all documents (paginated)
    getAllDocuments: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            
            // Get documents with pagination
            const documents = await Document.find()
                .select('name type createdAt')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            
            const total = await Document.countDocuments();
            
            res.status(200).json({
                documents,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / limit)
                }
            });
            
        } catch (error) {
            console.error('Error retrieving documents:', error);
            res.status(500).json({ error: 'Failed to retrieve documents' });
        }
    }
};

module.exports = documentController;