import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @ManyToOne(() => Session, (session) => session.teams)
  session: Session;
}
