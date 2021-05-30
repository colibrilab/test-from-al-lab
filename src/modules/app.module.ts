import { Module } from '@nestjs/common';
import { FootballerModule } from './footballer/footballer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      cache: true,
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [__dirname + '/../entities/*{.ts,.js}'],
    }),
    FootballerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
