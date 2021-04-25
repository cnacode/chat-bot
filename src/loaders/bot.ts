import { map, mergeMap, takeUntil } from 'rxjs/operators'
import { fromEvent } from 'rxjs'
import Bot from '../Bot'
import birthdayFlow from '../Bot/Flows/birthday'

export default function bot({ connect, disconnect }: any) {
    const botInstance = new Bot(birthdayFlow)

    function listenOnConnect(event: string) {
        return connect.pipe(
            mergeMap(({ io, client }) =>
                fromEvent(client, event).pipe(
                    takeUntil(fromEvent(client, 'disconnect')),
                    map((data) => ({ io, client, data }))
                )
            )
        )
    }

    listenOnConnect('message').subscribe(
        async ({ data, client }: { data: IncomingMessage; client: any }) => {
            const message: IncomingMessage = data
            const response = await botInstance.respond(message)
            client.send(response)
        }
    )
}
