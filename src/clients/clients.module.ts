import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Message } from './entities/message.entity';
import { Debt } from './entities/debt.entity';
import { FollowUpController } from './controllers/followUp.controller';
import { OpenAIService } from './services/openai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Message, Debt])],
  providers: [ClientsService, OpenAIService],
  controllers: [ClientsController, FollowUpController]
})
export class ClientsModule {}
