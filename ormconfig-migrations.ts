import { db_config_env } from './src/_configs/env/db.config.env';

export const config = db_config_env[process.env.NODE_ENV];
