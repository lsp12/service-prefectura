import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { TipoDocumento } from './entities/tipo-documento.entity';

@Injectable()
export class TipoDocumentosService {
  constructor(
    @InjectRepository(TipoDocumento)
    private readonly tipoDocumentoRepository: Repository<TipoDocumento>,
  ) {}

  async create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
    const tipoDocumento = await this.tipoDocumentoRepository.create(
      createTipoDocumentoDto,
    );
    return await this.tipoDocumentoRepository.save(tipoDocumento);
  }

  async findAll() {
    return await this.tipoDocumentoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDocumento`;
  }

  async update(id: number, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    const tipoDocumento = await this.tipoDocumentoRepository.findOne(id);
    await this.tipoDocumentoRepository.update(id, updateTipoDocumentoDto);
    return await this.tipoDocumentoRepository.save(tipoDocumento);
  }

  async remove(id: number) {
    const tipoDocumento = await this.tipoDocumentoRepository.findOne(id);
    await this.tipoDocumentoRepository.remove(tipoDocumento);
    return 'tipoDocumento was deleted';
  }
}
