import { Test, TestingModule } from '@nestjs/testing';
import { PdflatexService } from './pdflatex.service';

describe('PdflatexService', () => {
  let service: PdflatexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdflatexService],
    }).compile();

    service = module.get<PdflatexService>(PdflatexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
