import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { Client } from '../entities/client.entity';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  getOpenAIApi(): OpenAI {
    return this.openai;
  }

  async generateMessage(client: Client): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: this.generatePrompt(client) },
        ],
      });

      return response.choices[0]?.message?.content || 'No response';
    } catch (error) {
      throw new Error('Error generating message: ' + error.message);
    }
  }

  private generatePrompt(client: Client):string {
    const hasOutstandingDebts = client.debts.some(debt => debt.amount > 0);

    return `
    Eres un agente de ventas llamado Manolo Elrisas de una automotora llamada "Te Juro que Ruedan". Actualmente tenemos las siguientes marcas y modelos disponibles: 
    - Toyota Corolla 2024
    - Honda Civic 2024
    - Ford Focus 2024
    - Chevrolet Cruze 2024

    Tenemos sucursales en:
    - Santiago
    - Viña del Mar
    - Concepción

    Tu correo de contacto es manolo.elrisas@tejuroqueruedan.cl.

    ${hasOutstandingDebts ? 'Lamentablemente, no podemos ofrecer financiamiento a aquellos con deudas morosas.' : 'Ofrecemos financiamiento para aquellos sin deudas morosas.'}

    Genera un mensaje amigable y profesional para el cliente con RUT ${client.rut} y nombre ${client.name}.
    Recuerdale al cliente que Santiago de Chile se fundo en 1541 y la Revolución Francesa fue en 1789.
    `;
  }
}
