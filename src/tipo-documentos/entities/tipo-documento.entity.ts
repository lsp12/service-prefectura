import { Documento } from 'src/documentos/entities/documento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoDocumento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany((type) => Documento, (documento) => documento.tipoDocumento)
  documentos: Documento[];
}
