import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import logger from './logger';
import { ENCODING } from './constants';
import { Config } from '@/types/config';

const isDev = process.env.NODE_ENV !== 'production';

dotenv.config({
  path: isDev ? '.env.local' : '.env',
});

const { CONFIG_FILE } = process.env;

const loadConfig = (path = '') => {
  try {
    logger.info(`Loading configuration file from ${path}`);
    return yaml.safeLoad(fs.readFileSync(path, { encoding: ENCODING }));
  } catch (e) {
    logger.error(e);
  }
};

export const getConfig: () => Config = () => loadConfig(CONFIG_FILE) as Config;

export const config = getConfig();
