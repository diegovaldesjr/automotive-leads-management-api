import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { Message } from '../entities/message.entity';
import { Debt } from '../entities/debt.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { OpenAIService } from './openai.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Debt)
    private debtsRepository: Repository<Debt>,
    private openAIService: OpenAIService,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['messages', 'debts'],
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { name, rut, messages, debts } = createClientDto;
    const client = this.clientsRepository.create({ name, rut });
    await this.clientsRepository.save(client);

    if (messages) {
      const messageEntities = messages.map(message => {
        const msg = this.messagesRepository.create({
          ...message,
          client,
        });
        return msg;
      });
      await this.messagesRepository.save(messageEntities);
    }

    if (debts) {
      const debtEntities = debts.map(debt => {
        const dbt = this.debtsRepository.create({
          ...debt,
          client,
        });
        return dbt;
      });
      await this.debtsRepository.save(debtEntities);
    }

    return this.findOne(client.id);
  }

  async addMessage(clientId: number, createMessageDto: CreateMessageDto): Promise<Client> {
    const client = await this.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const message = this.messagesRepository.create({
      ...createMessageDto,
      client,
    });

    await this.messagesRepository.save(message);

    return this.findOne(clientId);
  }

  async findClientsToFollowUp(): Promise<Client[]> {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    
    if (isNaN(today.getTime())) {
      throw new BadRequestException('Invalid date threshold');
    }

    try {
      const clients = await this.clientsRepository
        .createQueryBuilder('client')
        .leftJoinAndSelect('client.messages', 'message')
        .where('message.sentAt < :today', { today })
        .groupBy('client.id')
        .select(['client.id', 'client.name', 'client.rut'])
        .getMany();

      return clients
    } catch (error) {
      throw new Error('Error fetching clients for follow-up: ' + error.message);
    }
  }

  async generateMessage(id: number): Promise<{ text: string }> {
    const client = await this.findOne(id);

    if (!client) {
      throw new Error('Client not found');
    }

    const generatedMessage = await this.openAIService.generateMessage(client)

    return { text: generatedMessage };
  }
}
