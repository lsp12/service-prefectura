import { Documento } from 'src/documentos/entities/documento.entity';
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

  @ManyToOne((type) => Role, (role) => role.users)
  role: Role;

  @OneToMany((type) => Documento, (documento) => documento.user)
  documentos: Documento[];
}
