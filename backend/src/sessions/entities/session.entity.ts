import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Player } from 'src/players/entities/player.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Team, (team) => team.session)
  teams: Team[];

  @OneToMany(() => Player, (player) => player.session)
  players: Player[];
}
