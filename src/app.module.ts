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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
