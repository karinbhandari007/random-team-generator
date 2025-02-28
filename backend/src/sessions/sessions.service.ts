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
  // Round-Robin Distribution
  // async generateTeams(generateTeamsDto: GenerateTeamsDto) {
  //   const { generationName, teams, players } = generateTeamsDto;

  //   const session = this.sessionRepository.create({
  //     id: uuidv4(),
  //     generationName,
  //   });
  //   await this.sessionRepository.save(session);

  //   const savedTeams = await this.teamRepository.save(
  //     teams.map((team) => ({ ...team, session })),
  //   );

  //   const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
  //   const assignedPlayers = shuffledPlayers.map((player, index) => ({
  //     ...player,
  //     team: savedTeams[index % savedTeams.length],
  //     session,
  //   }));

  //   const savedPlayers = await this.playerRepository.save(assignedPlayers);

  //   const generatedTeams = savedTeams.map((team) => ({
  //     ...team,
  //     players: savedPlayers.filter((player) => player.team.id === team.id),
  //   }));

  //   return { sessionId: session.id, teams: generatedTeams };
  // }

  // Balanced Skill Distribution
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

    const sortedPlayers = [...players].sort(
      (a, b) => (b.skillLevel || 0) - (a.skillLevel || 0),
    );

    // Initialize an array to keep track of the current skill level for each team
    const teamSkills = savedTeams.map(() => 0); // This will track the total skill level of each team

    //  Assign players to teams based on the current team skill totals
    const assignedPlayers = sortedPlayers.map((player) => {
      // Find the index of the team with the lowest total skill level
      const minSkillTeamIndex = teamSkills.indexOf(Math.min(...teamSkills));

      // Assign the player to that team
      const team = savedTeams[minSkillTeamIndex];

      // Update the team's total skill level
      teamSkills[minSkillTeamIndex] += player.skillLevel || 0;

      return {
        ...player,
        team,
        session,
      };
    });

    // Save the players with their assigned teams
    const savedPlayers = await this.playerRepository.save(assignedPlayers);

    // Associate the players with their respective teams
    const generatedTeams = savedTeams.map((team) => ({
      ...team,
      players: savedPlayers.filter((player) => player.team.id === team.id),
    }));

    // Return the session ID and the generated teams with players
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
