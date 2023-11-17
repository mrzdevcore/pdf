import { Injectable } from '@nestjs/common';
import { TemplateDto } from './dto/template.dto';
import { createTempDirectory, pdflatex } from './utils/helpers';
import { TEMPLATE_MAP } from './templates';
import Template from './utils/template';
import { formatData } from './utils/toLatex';

@Injectable()
export class PdflatexService {
  async compile(data: TemplateDto) {
    const { type } = data;

    const { tex, cls } = TEMPLATE_MAP[type];

    const template = new Template({ isEscape: false });

    const tempDir = await createTempDirectory();

    const compiled = template.render(tex, await formatData(data, tempDir));

    return pdflatex(compiled, tempDir, cls);
  }
}
