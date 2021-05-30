import { Body, Controller, Delete, Get, HttpCode, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { FootballerService } from './footballer.service';
import { Footballer } from '../../entities/footballer';
import { FootballerCreateDto } from './dto/footballer.create.dto';
import { FootballerDeleteDto } from './dto/footballer.delete.dto';

@Controller()
@ApiTags('Footballers')
export class FootballerController {
  constructor(
    private readonly connection: Connection,
    private readonly footballerService: FootballerService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a list of all footballers' })
  async find(): Promise<Footballer[]> {
    return await this.footballerService.find();
  }

  @Put()
  @HttpCode(200)
  @ApiOperation({ summary: 'Add a new footballer' })
  async create(@Body() dto: FootballerCreateDto): Promise<Footballer> {
    return await this.footballerService.create(dto);
  }

  @Delete()
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove existing footballer' })
  async delete(@Body() dto: FootballerDeleteDto): Promise<void> {
    await this.footballerService.delete(dto);
  }
}
