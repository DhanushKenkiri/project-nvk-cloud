const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ocrController = require('../controllers/ocrController');
const analysisController = require('../controllers/analysisController');
const documentController = require('../controllers/documentController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// OCR Routes
router.post('/ocr/image', upload.single('file'), ocrController.processImage);
router.post('/ocr/pdf', upload.single('file'), ocrController.processPDF);
router.post('/ocr/docx', upload.single('file'), ocrController.processDOCX);

// Analysis Routes
router.post('/analyze/gemini', analysisController.analyzeWithGemini);
router.post('/rag/index', analysisController.indexForRAG);
router.post('/rag/query', analysisController.queryRAG);

// Document Routes
router.post('/documents', documentController.saveDocument);
router.get('/documents/:id', documentController.getDocument);
router.get('/documents', documentController.getAllDocuments);

module.exports = router;