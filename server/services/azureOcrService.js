// server/services/azureOcrService.js
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { ApiKeyCredentials } = require('@azure/ms-rest-js');

class AzureOCRService {
    constructor() {
        this.client = new ComputerVisionClient(
            new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': process.env.AZURE_COMPUTER_VISION_KEY } }),
            process.env.AZURE_COMPUTER_VISION_ENDPOINT
        );
    }

    async extractTextFromImage(imageBuffer) {
        try {
            const result = await this.client.recognizePrintedTextInStream(true, imageBuffer);
            let extractedText = '';
            result.regions.forEach(region => {
                region.lines.forEach(line => {
                    line.words.forEach(word => {
                        extractedText += word.text + ' ';
                    });
                    extractedText += '\n';
                });
            });
            return extractedText.trim();
        } catch (error) {
            throw new Error('Failed to extract text from image: ' + error.message);
        }
    }
}

module.exports = new AzureOCRService();