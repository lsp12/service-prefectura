import { Asistente } from 'src/asistente/entities/asistente.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.directors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany((type) => Asistente, (asistente) => asistente.director)
  asistentes: Asistente[];
}
