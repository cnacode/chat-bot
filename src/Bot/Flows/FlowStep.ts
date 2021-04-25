import { Subject } from 'rxjs'
import { getRepository } from 'typeorm'
import { Message } from '../../models/message'

export default class FlowStep {
    public id: string
    public previous!: string

    constructor(id: string, previous?: string) {
        this.id = id
        this.previous = previous!
    }

    createObserver(responseBucket: Subject<BotResponse>) {
        return async (message: IncomingMessage) => {
            if (!this.shouldRespond(message)) return
            const result = await this.process(message)
            if (!result || !result.response) return
            responseBucket.next(result)
            responseBucket.next = () => {}
        }
    }

    /*
     * MUST OVERRIDE
     * This method contains logic to generate a response
     * Any extra logic should be handled here
     */
    async process(input: IncomingMessage): Promise<BotResponse | undefined> {
        const messages = getRepository(Message)
        const message = new Message()
        message.content = input.content
        message.tempIdentifier = input.customerIdentifier
        await messages.save(message)

        return {
            id: this.id,
            response: 'I have no idea.',
        }
    }

    /*
     * MUST OVERRIDE
     * decide whether to response to a message or not
     */
    shouldRespond(message: IncomingMessage): Boolean {
        return true
    }
}
