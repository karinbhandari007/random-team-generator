import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  // Example method
  async createPlayer(playerDto: PlayerDto): Promise<Player> {
    const player = new Player();
    player.name = playerDto.name;
    player.skillLevel = playerDto.skillLevel; // Ensure this is handled correctly

    // Save player logic here
    return player; // Ensure the return type is correct
  }
}
