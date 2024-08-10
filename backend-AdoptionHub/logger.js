const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' }),
        new winston.transports.MongoDB({
            db: 'mongodb+srv://test:test@cluster0.wmvavdc.mongodb.net/section',
            collection: 'logs',
            level: 'info',
            options: { useUnifiedTopology: true, useNewUrlParser: true },
            storeHost: true
        })
    ]
});


const logUserActivity = (userName, sessionId, url, method) => {
    logger.info({
        userName: userName,
        sessionId: sessionId,
        url: url,
        method: method
    });
};
