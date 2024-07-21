import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsIn } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsIn(['client', 'agent'])
  @IsNotEmpty()
  role: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  sentAt: Date;
}
