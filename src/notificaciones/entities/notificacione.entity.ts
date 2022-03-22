import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notificacione {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: string;

  @Column({ default: false })
  estado: boolean;
}
