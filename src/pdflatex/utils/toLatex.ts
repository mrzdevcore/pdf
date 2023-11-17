import {
  Section,
  Image,
  MetaInfo,
  Signature,
  TemplateDto,
} from '@/pdflatex/dto/template.dto';
import logger from '@/utils/logger';
import { join } from 'path';
import { copy, wget } from './helpers';

export const toLatex = (str: TemplateStringsArray, ...args: unknown[]) => {
  const decoded = str.map((s, i) => `${s}${args[i] ? args[i] : ''}`).join('');

  return decoded
    .replace(/(\r\n|\r|\n)/g, '')
    .replace(/%/g, '\\%')
    .replace(/μ/g, '$\\mu$')
    .replace(/(  )+/g, ' ')
    .replace(/_/g, '\\textunderscore ')
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\\linebreak')
    .replace(/<u>/g, ' \\underline{')
    .replace(/<\/u>/g, '}')
    .replace(/<strong>/g, ' \\textbf{')
    .replace(/<\/strong>/g, '}')
    .replace(/<span style="text-decoration: underline;">/g, ' \\underline{')
    .replace(/<span>/g, ' \\underline{')
    .replace(/<\/span>/g, '}')
    .replace(/<br \/>/g, '\\linebreak ')
    .replace(/\\linebreak$/, '')
    .replace(/\\linebreak ?\\section/g, '\\section');
};

export const renderbody = (sections: Section[]): string =>
  toLatex`${sections
    .map(
      (section) =>
        `
          \\section*{${section.title}}
          ${section.body ? section.body : ''}
        `,
    )
    .join('')}`;

export const renderimages = async (
  images: Image[] = [],
  path: string,
): Promise<string> => {
  await copy(join('assets/signature.png'), join(path, 'blank-signature.png'));
  return (
    await Promise.all(
      images.map(async (image, i) => {
        const imageType =
          image.src?.match(/(PNG|png|JPG|jpg|JPEG|jpeg)/g)?.[0] ?? 'png';
        const imageName = `section-${i}.${imageType}`;
        const code = await wget(image.src, imageName, path);
        return code === 0
          ? `
              \\begin{figure}[!ht]\\centering
                \\vspace{-10pt}
                \\includegraphics[width=${
                  i % 2 === 0 ? '0.7' : '0.6'
                }\\linewidth]{${path}/${imageName}}
                \\vspace{-10pt}
                \\caption{${image.caption}}
                ${
                  i === images.length - 1
                    ? `\\vskip5pt\\includegraphics[width=0.4\\linewidth]{${path}/blank-signature}`
                    : ''
                }
              \\end{figure}
            `
          : '';
      }),
    )
  ).join(' ');
};

export const rendermeta = (metaInfo: MetaInfo) => {
  const data = new Map(metaInfo.data);
  let str = '';
  for (const d of data.values()) {
    str += `
      ${Object.keys(d)
        .map((key: string) => `\\textbf{${key}:} ${d[key]}`)
        .join(' -- ')}
      \\\\
    `;
  }
  return toLatex`\\section*{${metaInfo.title}}
  {
    \\raggedright 
    ${str}
  }`;
};

export const signature = async (s: Signature, path: string) => {
  const imageType = s.src?.match(/(PNG|png|JPG|jpg|JPEG|jpeg)/g)?.[0] ?? 'png';
  const code = s.src ? await wget(s.src, `s.${imageType}`, path) : 1;

  return {
    signatureName: s.name,
    signatureTitle: s.title,
    signature: code === 0 ? `s.${imageType}` : 'blank-signature.png',
  };
};

export const formatData = async (data: TemplateDto, path: string) => {
  const [images, s] = await Promise.all([
    renderimages(data.images, path),
    signature(data.signature, path),
  ]);
  return {
    ...data,
    meta: rendermeta(data.metaInfo),
    body: renderbody(data.sections),
    images,
    ...s,
  };
};
