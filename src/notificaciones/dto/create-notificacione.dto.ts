import { IsString } from 'class-validator';

export class CreateNotificacioneDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsString()
  fecha: string;

  @IsString()
  estado: boolean;
}
