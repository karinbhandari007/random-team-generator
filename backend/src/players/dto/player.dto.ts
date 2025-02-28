import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  skillLevel?: number;
}
