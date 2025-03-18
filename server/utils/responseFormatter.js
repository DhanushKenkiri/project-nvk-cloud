// server/utils/responseFormatter.js
class ResponseFormatter {
    static formatSuccess(data, message = 'Success') {
        return {
            success: true,
            message,
            data
        };
    }

    static formatError(message, error = null) {
        return {
            success: false,
            message,
            error: error ? error.message : null
        };
    }
}

module.exports = ResponseFormatter;