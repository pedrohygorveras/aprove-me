import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) - should create a user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ login: 'testuser', password: 'password', role: 'Operator' })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
      });
  });

  it('/users (GET) - should return an array of users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
});
