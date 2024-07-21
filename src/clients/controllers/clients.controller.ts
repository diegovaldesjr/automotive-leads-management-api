import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Client } from '../entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(+id);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Post(':id/message')
  async addMessage(
    @Param('id') id: string,
    @Body() createMessageDto: CreateMessageDto
  ): Promise<Client> {
    return this.clientsService.addMessage(+id, createMessageDto);
  }

  @Get(':id/generateMessage')
  async generateMessage(@Param('id') id: string): Promise<{ text: string }> {
    return this.clientsService.generateMessage(+id);
  }
}
