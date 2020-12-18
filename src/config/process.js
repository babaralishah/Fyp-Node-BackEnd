const { connection } = require("mongoose");

const devConfig = {
    PORT: process.env.PORT || 4000,
    connectionString: 'mongodb://localhost/userauth',
    onlinedb: 'mongodb+srv://medical:express@medicalexpresscluster-hkv5p.mongodb.net/userauth?retryWrites=true&w=majority',
    secretKey: 'gmail-12345'
}
module.exports = devConfig;