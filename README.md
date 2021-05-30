## Task

Pазработать простейшее серверное приложение, которое будет предоставлять API для следующих функций:
1. добавление в БД профиля футболиста (поля на усмотрение кандидата);
2. получение списка футболистов из БД;
3. удаление футболиста из БД;

При этом из БД должно быть нельзя удалить футболиста, имеющего 10й игровой номер.

Из того, что обязательно использовать:
1. любой http-фреймворк (на усмотрение кандидата);
2. любую ORM (на усмотрение кандидата);
3. входящие данные должны проходить валидацию (библиотека на усмотрение кандидата);
4. API может быть либо RESTful, либо на основе GraphQL (либо urql) - также на усмотрение кандидата;
5. в коде обойтись без require, использовать import;

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Configuration
```bash
/src/config.ts
```


## API resources
http://localhost:3000/ - server

http://localhost:3000/docs/ - swagger documentation