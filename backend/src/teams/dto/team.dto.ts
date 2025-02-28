import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerDto } from '../../players/dto/player.dto';

export class TeamDto {
  @IsString()
  name: string;
}

export class GenerateTeamsDto {
  @IsString()
  generationName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamDto)
  teams: TeamDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  players: PlayerDto[];
}
