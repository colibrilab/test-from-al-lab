import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';

describe('FootballerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/ (GET, PUT, DELETE)', async () => {
    const player0 = { name: 'Stephen William Hawking', number: -1 };
    const player1 = { name: 'Roger Penrose', number: 10 };
    const player2 = { name: 'Neil deGrasse Tyson', number: 3 };

    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([]);

    await request(app.getHttpServer())
      .put('/')
      .expect(400);

    await request(app.getHttpServer())
      .put('/')
      .send(player0)
      .expect(400);

    await request(app.getHttpServer())
      .put('/')
      .send(player1)
      .expect(200, { id: 1, name: player1.name, number: player1.number })
      .expect('Content-Type', /json/);

    await request(app.getHttpServer())
      .put('/')
      .send(player2)
      .expect('Content-Type', /json/)
      .expect(200, { id: 2, name: player2.name, number: player2.number });

    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        if (!Array.isArray(res.body)) {
          throw 'the result must be an array';
        }
        if (res.body.length !== 2) {
          throw 'the result should return two elements';
        }
      });

    await request(app.getHttpServer())
      .delete('/')
      .send({ id: 1 })
      .expect(400);

    await request(app.getHttpServer())
      .delete('/')
      .send({ id: 2 })
      .expect(200);
  });
});
