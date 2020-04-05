import mongoose from 'mongoose'
import { Db } from 'mongodb'
import config from '../config'

export default async function (logger: AppLogger): Promise<Db | void> {
    const {
        database: { URL },
    } = config

    if (!URL) {
        logger.error('MongoDB connection DB URL is empty')
        return
    }

    const mongooseInstance = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

    return mongooseInstance.connection.db
}
