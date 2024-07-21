import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { Debt } from './clients/entities/debt.entity';
import { Message } from './clients/entities/message.entity';
import { Client } from './clients/entities/client.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Client, Message, Debt],
      synchronize: true,
    }),
    ClientsModule,
  ]
})
export class AppModule {}
