import { Controller, Get } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { Client } from '../entities/client.entity';


@Controller()
export class FollowUpController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('clients-to-do-follow-up')
  async findClientsToDoFollowUp(): Promise<Client[]> {
    return this.clientsService.findClientsToFollowUp();
  }
}
