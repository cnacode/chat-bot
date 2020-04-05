// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import { config } from 'dotenv'

const envFound = config()

if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️ Couldn't find .env file  ⚠️")
}

export default {
    port: parseInt(process.env.PORT || '3030', 10),
    database: {
        URL: process.env.DB_URL,
    },
    jwtSecret: process.env.JWT_SECRET,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
}
