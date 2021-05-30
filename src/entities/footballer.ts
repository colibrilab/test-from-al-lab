import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Footballer {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'number', type: 'int' })
  number: number;
}
