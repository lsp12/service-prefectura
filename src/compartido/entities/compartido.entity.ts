import { Documento } from 'src/documentos/entities/documento.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compartido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.compartidos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne((type) => Documento, (Documento) => Documento.compartidos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  documento: Documento;
}
