import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompartidoService } from './compartido.service';
import { CreateCompartidoDto } from './dto/create-compartido.dto';
import { UpdateCompartidoDto } from './dto/update-compartido.dto';

@Controller('compartido')
export class CompartidoController {
  constructor(private readonly compartidoService: CompartidoService) {}

  @Post()
  create(@Body() createCompartidoDto: CreateCompartidoDto) {
    return this.compartidoService.create(createCompartidoDto);
  }

  @Get()
  findAll() {
    return this.compartidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compartidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompartidoDto: UpdateCompartidoDto) {
    return this.compartidoService.update(+id, updateCompartidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compartidoService.remove(+id);
  }
}
