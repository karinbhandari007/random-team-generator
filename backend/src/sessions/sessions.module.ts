import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { Player } from 'src/players/entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team, Session])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
