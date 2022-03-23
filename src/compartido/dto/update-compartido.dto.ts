import { PartialType } from '@nestjs/mapped-types';
import { CreateCompartidoDto } from './create-compartido.dto';

export class UpdateCompartidoDto extends PartialType(CreateCompartidoDto) {}
