import FlowStep from './FlowStep'
import { hello, yes, no } from '../../consts'
import { getRepository } from 'typeorm'
import { Message } from '../../models/message'
import { Customer } from '../../models/customer'
import { parse, getTime, differenceInDays, getMonth, getDay } from 'date-fns'
import { zonedTimeToUtc, toDate } from 'date-fns-tz'

class OnBirthDateDecision extends FlowStep {
    shouldRespond(message: IncomingMessage): Boolean {
        return message.previousId == this.previous
    }

    async process(message: IncomingMessage): Promise<BotResponse | undefined> {
        const decision = message.content
        if (yes.includes(decision.toLowerCase())) {
            let days = 0

            const customers = getRepository(Customer)
            const customer = await customers.findOne({
                lastTempIdentifier: message.customerIdentifier,
            })
            if (customer && customer.lastTempIdentifier) {
                try {
                    const birthDate = new Date(Number(customer.birthDate))
                    const today = new Date()
                    const month = getMonth(birthDate)
                    const day = getMonth(birthDate)
                    const year = today.getFullYear()
                    let nextBirthday = new Date(year, month - 1, day)
                    if (today.getTime() > nextBirthday.getTime()) {
                        nextBirthday = new Date(year + 1, month - 1, day)
                    }
                    days = differenceInDays(nextBirthday, new Date())

                    return {
                        id: this.id,
                        response: `There are ${days} days left until your next birthday.`,
                    }
                } catch (e) {}
            } else {
                return {
                    id: this.id,
                    response: `I'm too drunk to remember your birthday`,
                }
            }
        }

        if (no.includes(decision.toLowerCase())) {
            return {
                id: this.id,
                response: `Goodbye now!`,
            }
        }
    }
}

class OnBirthDate extends FlowStep {
    shouldRespond(message: IncomingMessage): Boolean {
        return message.previousId == this.previous
    }

    async process(message: IncomingMessage): Promise<BotResponse | undefined> {
        const birthDate = message.content
        const customers = getRepository(Customer)
        const customer = await customers.findOne({
            lastTempIdentifier: message.customerIdentifier,
        })
        if (customer && customer.lastTempIdentifier) {
            try {
                const date = zonedTimeToUtc(birthDate, 'Etc/GMT')
                customer.birthDate = getTime(date)
                await customers.save(customer)
            } catch (e) {}
        }

        return {
            id: this.id,
            response: `Wanna know how many days left till your next birthday?`,
        }
    }
}

class OnName extends FlowStep {
    shouldRespond(message: IncomingMessage): Boolean {
        return message.previousId == this.previous
    }

    async process(message: IncomingMessage): Promise<BotResponse | undefined> {
        const name = message.content
        const customers = getRepository(Customer)
        const customer = new Customer()
        customer.firstName = message.content
        customer.lastTempIdentifier = message.customerIdentifier
        try {
            await customers.save(customer)
        } catch (e) {}
        return {
            id: this.id,
            response: `That's a jolly good name ${name}. What's your birth date?`,
        }
    }
}

class OnHello extends FlowStep {
    shouldRespond(message: IncomingMessage): Boolean {
        return hello.includes(message.content.toLowerCase())
    }

    async process(message: IncomingMessage): Promise<BotResponse | undefined> {
        return {
            id: this.id,
            response: `Howdy pilgrim! What's your first name?`,
        }
    }
}

const onHello = new OnHello('ON_HELLO')
const onName = new OnName('ON_NAME', 'ON_HELLO')
const onBirthDate = new OnBirthDate('ON_BIRTH_DATE', 'ON_NAME')
const onBirthDateDecision = new OnBirthDateDecision(
    'ON_BIRTH_DATE_DECISION',
    'ON_BIRTH_DATE'
)
const defaultResponse = new FlowStep('DEFAULT')
export default [
    onHello,
    onName,
    onBirthDate,
    onBirthDateDecision,
    defaultResponse,
]
