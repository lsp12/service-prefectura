import { Asistente } from 'src/asistente/entities/asistente.entity';
import { Compartido } from 'src/compartido/entities/compartido.entity';
import { Director } from 'src/director/entities/director.entity';
import { Documento } from 'src/documentos/entities/documento.entity';
import { Notificacione } from 'src/notificaciones/entities/notificacione.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Asistente, (Asistente) => Asistente.user)
  asistentes: Asistente[];

  @OneToMany(() => Director, (Director) => Director.user)
  directors: Director[];

  @OneToMany(() => Documento, (documento) => documento.user)
  documentos: Documento[];

  @OneToMany(() => Compartido, (Compartido) => Compartido.user)
  compartidos: Compartido[];

  @OneToMany(() => Notificacione, (Notificacione) => Notificacione.user)
  notificaciones: Notificacione[];

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role;
}
