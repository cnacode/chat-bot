import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm'
import { Customer } from './customer'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { length: 200 })
    content!: string

    @Column('char', { length: 128 })
    tempIdentifier!: string

    @ManyToOne(() => Customer, (customer: Customer) => customer.messages)
    customer!: Customer

    @CreateDateColumn()
    readonly createdAt!: Date

    @UpdateDateColumn()
    readonly updatedAt!: Date
}
