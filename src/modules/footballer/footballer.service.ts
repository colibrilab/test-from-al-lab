import * as _ from 'lodash';
import { Connection, EntityManager } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Footballer } from '../../entities/footballer';
import { FootballerCreateDto } from './dto/footballer.create.dto';
import { FootballerDeleteDto } from './dto/footballer.delete.dto';
import { Config } from '../../config';

@Injectable()
export class FootballerService {
  constructor(private readonly connection: Connection) {}

  async checkCreateCondition(
    manager: EntityManager,
    footballer: Footballer,
  ): Promise<void> {
    const exists = await manager.getRepository(Footballer).findOne({
      name: footballer.name,
    });
    if (exists) {
      throw new HttpException(
        'A player with that name already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkDeleteCondition(footballer: Footballer): Promise<void> {
    if (!footballer) {
      throw new HttpException('Player not found.', HttpStatus.BAD_REQUEST);
    }
    if (footballer.number === Config.indelibleNumber) {
      throw new HttpException(
        'Сan not delete players with this number.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async find(): Promise<Footballer[]> {
    return (await this.connection.manager
      .createQueryBuilder()
      .select('dbo')
      .from('Footballer', 'dbo')
      .getMany()) as Footballer[];
  }

  async create(dto: FootballerCreateDto): Promise<Footballer> {
    let footballer: Footballer = null;
    await this.connection.manager.transaction(
      async (transactionalEntityManager) => {
        footballer = _.cloneDeep(dto);
        await this.checkCreateCondition(transactionalEntityManager, footballer);
        await transactionalEntityManager
          .getRepository(Footballer)
          .save(footballer);
      },
    );
    return footballer;
  }

  async delete(dto: FootballerDeleteDto): Promise<void> {
    await this.connection.manager.transaction(
      async (transactionalEntityManager) => {
        const footballer = await transactionalEntityManager
          .getRepository(Footballer)
          .findOne({
            id: dto.id,
          });
        await this.checkDeleteCondition(footballer);
        await transactionalEntityManager
          .createQueryBuilder()
          .delete()
          .from(Footballer)
          .where('id = :id', { id: dto.id })
          .execute();
      },
    );
  }
}
