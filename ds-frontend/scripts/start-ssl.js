const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require("dotenv").config();

const base64Certificate = process.env.REACT_APP_CLIENT_CERT;
const base64Key = process.env.REACT_APP_PVT_KEY;

if (!base64Certificate || !base64Key) {
  console.error('Base64-encoded certificate and key not found in environment variables.');
  process.exit(1);
}

const certificatePath = path.join(__dirname, 'cert.crt');
const keyPath = path.join(__dirname, 'key.pem');

// Decode the base64-encoded certificate and key
const certificate = Buffer.from(base64Certificate, 'base64').toString('ascii');
const key = Buffer.from(base64Key, 'base64').toString('ascii');

// Write the decoded certificate and key to files
fs.writeFileSync(certificatePath, certificate);
fs.writeFileSync(keyPath, key);

// Start the development server with SSL
const script = 'react-scripts start';

const options = {
  env: {
    ...process.env,
    HTTPS: true,
    SSL_CRT_FILE: certificatePath,
    SSL_KEY_FILE: keyPath,
  },
  stdio: 'inherit',
};

const child = exec(script, options);

child.on('exit', (code) => {
  fs.unlinkSync(certificatePath);
  fs.unlinkSync(keyPath);
  process.exit(code);
});
