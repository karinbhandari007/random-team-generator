import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Player } from 'src/players/entities/player.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  generationName: string;

  @OneToMany(() => Team, (team) => team.session)
  teams: Team[];

  @OneToMany(() => Player, (player) => player.session)
  players: Player[];
}
