import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { GenerateTeamsDto } from 'src/teams/dto/team.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  async generateTeams(generateTeamsDto: GenerateTeamsDto) {
    const { generationName, teams, players } = generateTeamsDto;

    const session = this.sessionRepository.create({
      id: uuidv4(),
      generationName,
    });
    await this.sessionRepository.save(session);

    const savedTeams = await this.teamRepository.save(
      teams.map((team) => ({ ...team, session })),
    );

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const assignedPlayers = shuffledPlayers.map((player, index) => ({
      ...player,
      team: savedTeams[index % savedTeams.length],
      session,
    }));

    const savedPlayers = await this.playerRepository.save(assignedPlayers);

    const generatedTeams = savedTeams.map((team) => ({
      ...team,
      players: savedPlayers.filter((player) => player.team.id === team.id),
    }));

    return { sessionId: session.id, teams: generatedTeams };
  }

  async getSession(sessionId: string): Promise<{
    sessionId: string;
    generationName: string;
    teams: any[];
    players: Player[];
  } | null> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['teams', 'players', 'players.team', 'teams.players'],
    });

    if (!session) {
      return null;
    }

    return {
      sessionId: session.id,
      generationName: session.generationName,
      teams: session.teams.map((team) => {
        return {
          id: team.id,
          name: team.name,
          players: team.players || [],
        };
      }),
      players: session.players || [],
    };
  }
}
