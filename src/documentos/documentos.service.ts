/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Documento } from './entities/documento.entity';
import * as carbone from 'carbone';
import * as fs from 'fs';
import * as util from 'util';
import * as libre from './libreoffice';
import { Express, Response } from 'express';
import { PDFDocument } from 'pdf-lib';
import * as qrcode from 'qrcode';

const libreAsyncConvert = util.promisify(libre.convert);

//hacer un contador que empiece en 001 y que se incremente en 1
let contador = 1;

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

  async Carbone(res: Response, data) {
    console.log(data);
    /* const data = {
      name: 'John',
      date: '2019-01-01',
      tipoDoc: 'DNI',
      cuerpo: 'cuerpo',
    }; */
    let aux = '';
    if (contador >= 100) {
      aux = contador.toString();
    } else if (contador >= 10) {
      aux = '0' + contador;
    } else {
      aux = '00' + contador;
    }
    contador++;
    data.contador = aux;
    carbone.render(
      './src/doc/Modelo Oficio.docx',
      data,
      async function (err, result) {
        if (err) {
          return console.log(err);
        }
        // write the result
        fs.writeFileSync('./src/documentos/result.docx', result);

        const ext = '.pdf';
        const inputPath = './src/documentos/result.docx';
        const outputPath = './src/documentos/result.pdf';

        const docxBuf = await fs.promises.readFile(inputPath);

        const pdfBuf = (await libreAsyncConvert(
          docxBuf,
          ext,
          undefined,
        )) as Buffer;
        await fs.promises.writeFile(outputPath, pdfBuf);

        const pdfAsBuffer = await fs.promises.readFile(outputPath);

        const pdfDoc = await PDFDocument.load(pdfAsBuffer, {
          ignoreEncryption: true,
        });

        const urlCv = data.name;

        const QR = await qrcode.toDataURL(urlCv);

        const Base64QR = QR.replace(/^data:image\/png;base64,/, '');

        fs.writeFileSync('./src/documentos/QR.png', Base64QR, 'base64');

        const imageBuffer = await fs.promises.readFile(
          './src/documentos/QR.png',
        );

        const pngImage = await pdfDoc.embedPng(imageBuffer);
        const pages = pdfDoc.getPages();
        const pngDims = pngImage.scale(0.6);
        pages[0].drawImage(pngImage, {
          x: 70,
          y: 192,
          width: pngDims.width,
          height: pngDims.height,
        });

        await fs.promises.writeFile(
          './src/documentos/withQR.pdf',
          await pdfDoc.save({ useObjectStreams: false }),
        );

        const pdfBuffer = fs.readFileSync('./src/documentos/withQR.pdf');

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);

        fs.unlinkSync(outputPath);
        fs.unlinkSync('./src/documentos/withQR.pdf');
        fs.unlinkSync('./src/documentos/QR.png');
        fs.unlinkSync(inputPath);
      },
    );
    return 'Carbone exitoso';
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
