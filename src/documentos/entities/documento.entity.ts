import { Compartido } from 'src/compartido/entities/compartido.entity';
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

  @Column({ default: false })
  compartida: boolean;

  @ManyToOne(
    (type) => TipoDocumento,
    (tipoDocumento) => tipoDocumento.documentos,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  tipoDocumento: TipoDocumento;

  @ManyToOne((type) => User, (user) => user.documentos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany((type) => Compartido, (compartido) => compartido.documento)
  compartidos: Compartido[];
}
