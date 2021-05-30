import { Module } from '@nestjs/common';
import { FootballerController } from './footballer.controller';
import { FootballerService } from './footballer.service';

@Module({
  controllers: [FootballerController],
  providers: [FootballerService],
})
export class FootballerModule {}
