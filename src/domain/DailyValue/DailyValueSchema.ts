import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export interface DailyValueDTO {
    id?: number;
    units: string;
    value: number;
    nutr_no: string;
}

/**
 * TypeORM Schema Config
 */
@Entity('daily_value')
export class DailyValueSchema implements DailyValueDTO {
    @PrimaryGeneratedColumn()
    // tslint:disable-next-line:variable-name
    public id?: number;
    @Column()
    public units: string;
    @Column()
    public value: number;
    @Column()
    public nutr_no: string;
}