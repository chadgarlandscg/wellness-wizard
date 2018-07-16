import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { NutrientSchema, NutrientDto } from '../Nutrient/NutrientSchema';

export interface DailyValueDto {
    id?: number;
    units: string;
    value: number;
    nutrNo: string;

    nutrient: NutrientDto;
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
    public nutrNo: string;

    @OneToOne(type => NutrientSchema, nutrient => nutrient.dailyValue)
    @JoinColumn({name: 'nutr_no'})
    public nutrient: NutrientSchema;
}
