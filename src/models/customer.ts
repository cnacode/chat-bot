import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm'

import { Message } from './message'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    public id: number

    @Column('varchar', { length: 200 })
    public firstName: string

    @Column('char', { length: 128, unique: true })
    public lastTempIdentifier: string

    @Column('varchar', { length: 200, nullable: true })
    public email!: string

    @OneToMany(() => Message, (message: Message) => message.customer)
    messages!: Message[]

    @Column('bigint', { nullable: true })
    public birthDate!: number

    @CreateDateColumn()
    public createdAt: number

    @UpdateDateColumn()
    public updatedAt: number
}
