import { Subject } from 'rxjs'
import FlowStep from './Flows/FlowStep'
import { Connection } from 'typeorm'

export default class Bot {
    private conversationFlow: FlowStep[]
    private database: Connection

    constructor(conversationFlow: FlowStep[]) {
        this.conversationFlow = conversationFlow
    }

    respond(message: IncomingMessage) {
        return new Promise((resolve) => {
            const userMessage = new Subject<IncomingMessage>()
            const response = new Subject<BotResponse>()

            //if any flow step responds, close all done
            response.subscribe((flowResponse: BotResponse) => {
                return resolve(flowResponse)
            })

            //have all flow steps check the message
            this.conversationFlow.forEach((step) => {
                userMessage.subscribe(step.createObserver(response))
            })

            userMessage.next(message)
        })
    }
}
