module.exports = {
    success: (data, message) => ({
        'result': 1,
        'data': data || null,
        'message': message || 'successful'
    }),

    error: (message, result, data) => ({
        'result': result || 0,
        'data': data || null,
        'message': message
    })
}
