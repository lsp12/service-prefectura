import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Documento } from './entities/documento.entity';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
  ) {}

  async create(createDocumentoDto: CreateDocumentoDto) {
    const documento = await this.documentoRepository.create(createDocumentoDto);
    return await this.documentoRepository.save(documento);
  }

  async findByUser(id: number) {
    return await this.documentoRepository.find({
      where: {
        user: id,
      },
    });
  }

  findAll() {
    return `This action returns all documentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
