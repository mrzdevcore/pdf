import { Module } from '@nestjs/common';
import { PdflatexController } from './pdflatex/pdflatex.controller';
import { PdflatexService } from './pdflatex/pdflatex.service';

@Module({
  imports: [],
  controllers: [PdflatexController],
  providers: [PdflatexService],
})
export class AppModule {}
