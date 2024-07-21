import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMessageDto } from './create-message.dto';
import { CreateDebtDto } from './create-debt-dto';
import { IsRUT } from 'src/clients/validators/is-rut.validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsRUT()
  rut: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMessageDto)
  messages: CreateMessageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDebtDto)
  debts: CreateDebtDto[];
}
