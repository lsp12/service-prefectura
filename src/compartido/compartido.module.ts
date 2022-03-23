import { Module } from '@nestjs/common';
import { CompartidoService } from './compartido.service';
import { CompartidoController } from './compartido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compartido } from './entities/compartido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compartido])],
  controllers: [CompartidoController],
  providers: [CompartidoService],
})
export class CompartidoModule {}
