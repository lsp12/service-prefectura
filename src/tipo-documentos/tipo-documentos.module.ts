import { Module } from '@nestjs/common';
import { TipoDocumentosService } from './tipo-documentos.service';
import { TipoDocumentosController } from './tipo-documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from './entities/tipo-documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumento])],
  controllers: [TipoDocumentosController],
  providers: [TipoDocumentosService],
})
export class TipoDocumentosModule {}
