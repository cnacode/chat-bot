import { of, fromEvent } from 'rxjs'
import { map, switchMap, mergeMap } from 'rxjs/operators'
import http from 'http'

type SocketDependencies = {
    server: http.Server
    logger: AppLogger
}
const socketio = ({ server, logger }: SocketDependencies) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })

    const io$ = of(io)

    const connect = io$.pipe(
        switchMap((io) =>
            fromEvent(io, 'connection').pipe(map((client) => ({ io, client })))
        )
    )

    const disconnect = connect.pipe(
        mergeMap(({ client }: any) =>
            fromEvent(client, 'disconnect').pipe(map(() => client))
        )
    )

    logger.info('✅socket.io created!')

    // connect.subscribe(({ client }: any) => {
    //     console.log('connected: ', client.id)
    // })

    // disconnect.subscribe((client) => {
    //     console.log('disconnected: ', client.id)
    // })

    return {
        connect,
        disconnect,
    }
}

export default socketio
