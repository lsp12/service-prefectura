import { IsString } from 'class-validator';

export class CreateDocumentoDto {
  @IsString()
  titulo: string;
  @IsString()
  descripcion: string;
  @IsString()
  fecha: string;
  @IsString()
  estado: boolean;
}
