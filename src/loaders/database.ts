import { Connection, createConnection } from 'typeorm'
import { Message } from '../models/message'
import { Customer } from '../models/customer'

export default async function (
    logger: AppLogger
): Promise<DatabaseAbstraction> {
    try {
        let database: Connection = await createConnection({
            type: 'postgres',
            host: '0.0.0.0',
            port: 5432,
            username: 'postgres',
            password: 'docker',
            database: 'chatapp',
            entities: [Message, Customer],
            synchronize: true,
        })
        return { database }
    } catch (e) {
        console.error(e.message)
        return {}
    }
}
