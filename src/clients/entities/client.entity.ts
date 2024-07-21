import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { Debt } from './debt.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rut: string;

  @OneToMany(() => Message, (message) => message.client, { cascade: true })
  messages: Message[];

  @OneToMany(() => Debt, (debt) => debt.client, { cascade: true })
  debts: Debt[];
}
