import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Message } from './entities/message.entity';
import { Debt } from './entities/debt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Message, Debt])],
  providers: [ClientsService],
  controllers: [ClientsController]
})
export class ClientsModule {}
