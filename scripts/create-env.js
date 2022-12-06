// To be used during deploy process
// Create the .env file
const fs = require('fs')
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_API_KEY=${process.env.REACT_APP_FIREBASE_API_KEY}\n`)
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_AUTH_DOMAIN=${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}\n`)
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_PROJECT_ID=${process.env.REACT_APP_FIREBASE_PROJECT_ID}\n`)
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_STORAGE_BUCKET=${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}\n`)
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}\n`)
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_APP_ID=${process.env.REACT_APP_FIREBASE_APP_ID}\n`)
fs.writeFileSync('./.env', `REACT_APP_FIREBASE_MEASUREMENT_ID=${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}\n`)
fs.writeFileSync('./.env', `REACT_APP_PUBLIC_URL=${process.env.REACT_APP_PUBLIC_URL}\n`)
fs.writeFileSync('./.env', `REACT_APP_CORS_PROXY_URL=${process.env.REACT_APP_CORS_PROXY_URL}\n`)