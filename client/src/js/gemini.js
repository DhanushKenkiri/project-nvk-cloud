import { CONFIG } from './app.js';
import axios from 'axios';

// Function to analyze text with Gemini API
export async function analyzeWithGemini(text, callback) {
    try {
        const response = await axios.post(`${CONFIG.API_URL}/analyze/gemini`, {
            text: text
        });
        
        if (response.data && response.data.results) {
            callback(response.data.results);
        } else {
            callback(null, 'Error generating analysis. Please try again.');
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        callback(null, 'Error analyzing the document. Please try again.');
    }
}