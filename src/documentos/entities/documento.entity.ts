import { TipoDocumento } from 'src/tipo-documentos/entities/tipo-documento.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: string;

  @ManyToOne(
    (type) => TipoDocumento,
    (tipoDocumento) => tipoDocumento.documentos,
  )
  tipoDocumento: TipoDocumento;

  @ManyToOne((type) => User, (user) => user.documentos)
  user: User;
}
