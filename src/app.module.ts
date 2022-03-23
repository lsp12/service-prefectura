import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { TipoDocumentosModule } from './tipo-documentos/tipo-documentos.module';
import { DocumentosModule } from './documentos/documentos.module';
import { AsistenteModule } from './asistente/asistente.module';
import { DirectorModule } from './director/director.module';
import { CompartidoModule } from './compartido/compartido.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    RolesModule,
    NotificacionesModule,
    TipoDocumentosModule,
    DocumentosModule,
    AsistenteModule,
    DirectorModule,
    CompartidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
