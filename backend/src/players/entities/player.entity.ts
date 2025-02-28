import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  skillLevel?: number;

  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  team: Team;

  @ManyToOne(() => Session, (session) => session.players, { nullable: true })
  session: Session;
}
