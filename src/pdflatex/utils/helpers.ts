import { spawn } from 'child_process';
import { readFile as readFileAsync, writeFile as writeFileAsync } from 'fs';
import { dir as tmpDir } from 'tmp';
import { join } from 'path';

import logger from '@/utils/logger';

const FILE_NAME = 'r';

export const wget = (uri: string, id: string, path: string) =>
  new Promise<number>(async (resolve, reject) => {
    const wget = spawn('wget', [uri, '-O', `${path}/${id}`]);
    wget.on('error', (err: Error) => {
      logger.error(err);
      reject(err);
    });
    wget.on('close', (code) => resolve(code));
  });

export const copy = (source: string, dest: string) =>
  new Promise<number>(async (resolve, reject) => {
    const copy = spawn('cp', [source, dest]);
    copy.stderr.on('data', (chunk) => logger.error(chunk));
    copy.on('error', (err: Error) => {
      logger.error(err);
      reject(err);
    });
    copy.on('close', (code) => resolve(code));
  });

export const readFile = (path: string) =>
  new Promise<Buffer>((resolve, reject) =>
    readFileAsync(path, (err, data) => (err ? reject(err) : resolve(data))),
  );

export const writeFile = (path: string, data: string) =>
  new Promise<void>((resolve, reject) =>
    writeFileAsync(path, data, (err) => (err ? reject(err) : resolve())),
  );

export const createTempDirectory = () =>
  new Promise<string>((resolve, reject) =>
    tmpDir((err, path) => (err ? reject(err) : resolve(path))),
  );

const isErrorLine = (line: string) => line.length > 0 && line.charAt(0) === '!';

const filterErrorLines = (log: string) =>
  log
    .split('\n')
    .filter(isErrorLine)
    .map((line) => line.substring(2))
    .join('\n');

/**
 * Read pdflatex error log
 */
export const readErrorLog = async (dirname: string) => {
  const log = await readFile(join(dirname, `${FILE_NAME}.log`));
  return filterErrorLines(log.toString()) || 'LaTeX Error';
};

const compile = async (path: string) => {
  try {
    await new Promise<number>(async (resolve, reject) => {
      const pdflatex = spawn(
        'pdflatex',
        ['-shell-escape', '-interaction=batchmode', `${FILE_NAME}.tex`],
        {
          cwd: path,
        },
      );
      pdflatex.stderr.on('data', (chunk) => logger.error(chunk));
      pdflatex.on('error', (err: Error) => {
        logger.error(err);
        reject(err);
      });
      pdflatex.on('close', (code) => resolve(code));
    });
    return join(path, `${FILE_NAME}.pdf`);
  } catch {
    throw await readErrorLog(path);
  }
};

export const pdflatex = async (tex: string, path: string, cls: string) => {
  await Promise.all([
    writeFile(`${path}/${FILE_NAME}.tex`, tex),
    writeFile(`${path}/SelfArx.cls`, cls),
  ]);
  // latex need to be compiled twice
  await compile(path);
  return compile(path);
};
