import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TemplateDto } from './dto/template.dto';
import { PdflatexService } from './pdflatex.service';

@Controller('pdflatex')
export class PdflatexController {
  constructor(private readonly pdflatexServer: PdflatexService) {}

  @Post('/compile')
  @Header('Cache-Control', 'none')
  async compile(@Res() response: Response, @Body() data: TemplateDto) {
    const pdf = await this.pdflatexServer.compile(data);
    response.sendFile(pdf);
  }
}
