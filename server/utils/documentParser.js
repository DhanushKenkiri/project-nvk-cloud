// server/utils/documentParser.js
const mammoth = require('mammoth');
const pdf = require('pdf-parse');
const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');

class DocumentParser {
    static async parsePDF(buffer) {
        try {
            const data = await pdf(buffer);
            return data.text;
        } catch (error) {
            throw new Error('Failed to parse PDF: ' + error.message);
        }
    }

    static async parseDOCX(buffer) {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } catch (error) {
            throw new Error('Failed to parse DOCX: ' + error.message);
        }
    }

    static async extractKeyPhrases(text) {
        const client = new TextAnalyticsClient(process.env.AZURE_TEXT_ANALYTICS_ENDPOINT, new AzureKeyCredential(process.env.AZURE_TEXT_ANALYTICS_KEY));
        const documents = [text];
        const results = await client.extractKeyPhrases(documents);
        return results[0].keyPhrases;
    }
}

module.exports = DocumentParser;