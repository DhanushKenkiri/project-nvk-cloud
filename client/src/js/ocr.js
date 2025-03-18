import { CONFIG } from './app.js';
import axios from 'axios';

// Function to extract text from image using Azure OCR
export async function extractTextFromImage(file, callback) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(`${CONFIG.API_URL}/ocr/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data && response.data.text) {
            callback(response.data.text);
        } else {
            callback(null, 'No text found in the image or error in text extraction.');
        }
    } catch (error) {
        console.error('Error calling OCR service:', error);
        callback(null, 'Error processing the image. Please try again.');
    }
}

// Function to extract text from PDF
export async function extractTextFromPDF(file, callback) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(`${CONFIG.API_URL}/ocr/pdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data && response.data.text) {
            callback(response.data.text);
        } else {
            callback(null, 'Could not extract text from PDF.');
        }
    } catch (error) {
        console.error('Error extracting PDF text:', error);
        callback(null, 'Error processing the PDF. Please try again.');
    }
}

// Function to extract text from DOCX
export async function extractTextFromDOCX(file, callback) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(`${CONFIG.API_URL}/ocr/docx`, formData, {
            headers: {
'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.data && response.data.text) {
            callback(response.data.text);
        } else {
            callback(null, 'Could not extract text from DOCX.');
        }
    } catch (error) {
        console.error('Error extracting DOCX text:', error);
        callback(null, 'Error processing the DOCX. Please try again.');
    }
}