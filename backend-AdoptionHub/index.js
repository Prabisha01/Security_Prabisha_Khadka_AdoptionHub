const path = require("path");
const fs = require('fs');
const https = require('https');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const xssClean = require('xss-clean'); 
const mongoSanitize = require('express-mongo-sanitize'); 
const app = express();

dotenv.config();

// Load SSL certificate and key
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY_FILE)),
    cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CRT_FILE))
};

// Configure CORS policy
const corsPolicy = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsPolicy));

// Apply security-related HTTP headers
app.use(helmet());

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Prevent XSS attacks
app.use(xssClean());

// Sanitize data to prevent NoSQL injection attacks
app.use(mongoSanitize());

// Connect to MongoDB
connectDB();

// Accept JSON data
app.use(express.json());

// Multiparty middleware for handling file uploads
app.use(multiparty());

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Define routes
app.get('/hello', (req, res) => {
    res.send("Welcome to HELLO API start..");
});

app.get('/test', (req, res) => {
    res.send('Hello from express server');
});

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/pet', require('./routes/petRoute'));
app.use('/api/adopt', require('./routes/adoptionRoute'));
app.use('/api/event', require('./routes/eventRoute'));
app.use('/api/addtocart', require('./routes/cartRoute'));
app.use('/api/story', require('./routes/storyRoute'));
app.use('/api/contact', require('./routes/contactRoute'));
app.use('/api/fund', require('./routes/fundingRoute'));

// Define port
const PORT = process.env.PORT || 5000;

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
});

module.exports = app;
