import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  role: string;

  @Column()
  sentAt: Date;

  @ManyToOne(() => Client, (client) => client.messages)
  client: Client;
}
