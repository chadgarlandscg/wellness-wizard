import {Entity, Column, PrimaryColumn, OneToOne, OneToMany} from 'typeorm';
import { DailyValueSchema, DailyValueDto } from '../DailyValue/DailyValueSchema';
import { FoodNutritionSchema, FoodNutritionDto } from '../FoodNutrition/FoodNutritionSchema';
import { HIDE } from '../../util/DecoratorHelper';

export interface NutrientDto {
    nutr_no: string;
    units: string;
    tagname: string;
    nutrDesc: string;
    num_dec: string;
    sr_order: number;

    dailyValue: DailyValueDto;
    foodNutritions: FoodNutritionDto[];
}

/**
 * TypeORM Schema Config
 */
@Entity('nutr_def')
export class NutrientSchema implements NutrientDto {
    @PrimaryColumn()
    public nutr_no: string;
    @Column()
    public units: string;
    @Column()
    public tagname: string;
    @Column()
    public nutrDesc: string;
    @Column(HIDE)
    public num_dec: string;
    @Column(HIDE)
    public sr_order: number;

    @OneToOne(type => DailyValueSchema, dailyValue => dailyValue.nutrient)
    public dailyValue: DailyValueSchema;
    @OneToMany(type => FoodNutritionSchema, foodNutrition => foodNutrition.nutrient)
    public foodNutritions: FoodNutritionSchema[];
}
