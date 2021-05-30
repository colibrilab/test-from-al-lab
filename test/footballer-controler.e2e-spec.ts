import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { Config } from '../src/config';

describe('FootballerController (e2e)', () => {
  let app: INestApplication;
  let httpServer: INestApplication;

  beforeEach(async () => {
    if (!app) {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
      httpServer = app.getHttpServer();
    }
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/ (PUT) Can not add with incorrect data', async () => {
    await request(httpServer)
      .put('/')
      .expect(400);

    await request(httpServer)
      .put('/')
      .send({ name: 'Stephen William Hawking', number: -1 })
      .expect(400);
  });

  it('/ (PUT) Records with correct data are added', async () => {
    await request(httpServer)
      .put('/')
      .send({ name: 'Stephen William Hawking', number: Config.indelibleNumber })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('number');
      });

    await request(httpServer)
      .put('/')
      .send({ name: 'Roger Penrose', number: Config.indelibleNumber + 1 })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('number');
      });
  });

  it('/ (PUT) Can not add an entry with the same name', async () => {
    await request(httpServer)
      .put('/')
      .send({ name: 'Roger Penrose', number: Config.indelibleNumber + 1 })
      .expect(400);
  });

  it('/ (GET) Read the list of footballers', async () => {
    await request(httpServer)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect.arrayContaining(res.body);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('number');
      });
  });

  it(`/ (DELETE) Can not remove footballer with number ${Config.indelibleNumber}`, async () => {
    await request(httpServer)
      .delete('/')
      .send({ id: 1 })
      .expect(400);
  });

  it(`/ (DELETE) Remove a player with a number not equal to ${Config.indelibleNumber}`, async () => {
    await request(httpServer)
      .delete('/')
      .send({ id: 2 })
      .expect(200);
  });
});
