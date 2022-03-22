import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { Notificacione } from './entities/notificacione.entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacione)
    private notificacioneRepository: Repository<Notificacione>,
  ) {}

  async create(createNotificacioneDto: CreateNotificacioneDto) {
    const notificacione = await this.notificacioneRepository.create(
      createNotificacioneDto,
    );
    return await this.notificacioneRepository.save(notificacione);
  }

  findAll() {
    return `This action returns all notificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneDto: UpdateNotificacioneDto) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
  }
}
