import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateDebtDto {
  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dueDate: Date;
}
