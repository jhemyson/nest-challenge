import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Laboratories', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/GET laboratories', () => {
    it('should return status code 200 and body', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/v1/laboratories',
      );

      expect(status).toBe(200);
      expect(typeof body).toStrictEqual('object');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
