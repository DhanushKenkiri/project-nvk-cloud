const azureOcrService = require('../services/azureOcrService');
const documentParser = require('../utils/documentParser');
const fs = require('fs');
const path = require('path');

// Controller for OCR operations
const ocrController = {
    // Process image with Azure OCR (Tesseract)
    processImage: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            
            const filePath = req.file.path;
            
            // Extract text using Azure OCR service
            const extractedText = await azureOcrService.extractTextFromImage(filePath);
            
            // Clean up the file after processing
            fs.unlinkSync(filePath);
            
            res.status(200).json({ text: extractedText });
            
        } catch (error) {
            console.error('Error in OCR image processing:', error);
            res.status(500).json({ error: 'Failed to process image' });
        }
    },
    
    // Process PDF document
    processPDF: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            
            const filePath = req.file.path;
            
            // Extract text from PDF
            const extractedText = await documentParser.extractTextFromPDF(filePath);
            
            // Clean up the file after processing
            fs.unlinkSync(filePath);
            
            res.status(200).json({ text: extractedText });
            
        } catch (error) {
            console.error('Error in PDF processing:', error);
            res.status(500).json({ error: 'Failed to process PDF' });
        }
    },
    
    // Process DOCX document
    processDOCX: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            
            const filePath = req.file.path;
            
            // Extract text from DOCX
            const extractedText = await documentParser.extractTextFromDOCX(filePath);
            
            // Clean up the file after processing
            fs.unlinkSync(filePath);
            
            res.status(200).json({ text: extractedText });
            
        } catch (error) {
            console.error('Error in DOCX processing:', error);
            res.status(500).json({ error: 'Failed to process DOCX' });
        }
    }
};

module.exports = ocrController;