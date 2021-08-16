import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { ExamsModule } from './exams/exams.module';
import { db_config_env } from './_configs/env/db.config.env';

@Module({
  imports: [
    LaboratoriesModule,
    TypeOrmModule.forRoot(db_config_env[process.env.NODE_ENV || 'test']),
    ExamsModule,
  ],
})
export class AppModule {}
