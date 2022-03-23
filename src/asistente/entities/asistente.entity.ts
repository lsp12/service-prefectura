import { Director } from 'src/director/entities/director.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.asistentes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne((type) => Director, (director) => director.asistentes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  director: Director;
}
