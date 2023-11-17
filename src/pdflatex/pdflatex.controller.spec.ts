import { Test, TestingModule } from '@nestjs/testing';
import { PdflatexController } from './pdflatex.controller';

describe('PdflatexController', () => {
  let controller: PdflatexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdflatexController],
    }).compile();

    controller = module.get<PdflatexController>(PdflatexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
