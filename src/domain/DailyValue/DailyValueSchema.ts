import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { NutrientSchema } from '../Nutrient/NutrientSchema';

export interface DailyValueDto {
    id?: number;
    units: string;
    value: number;
    nutr_no: string;

    nutrient: NutrientSchema;
}

/**
 * TypeORM Schema Config
 */
@Entity('daily_value')
export class DailyValueSchema implements DailyValueDto {
    @PrimaryGeneratedColumn()
    public id?: number;
    @Column()
    public units: string;
    @Column()
    public value: number;
    @Column()
    public nutr_no: string;

    @OneToOne(type => NutrientSchema, nutrient => nutrient.dailyValue)
    @JoinColumn({name: 'nutr_no'})
    public nutrient: NutrientSchema;
}
