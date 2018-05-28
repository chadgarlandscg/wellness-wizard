import {Entity, Column, PrimaryColumn, OneToOne, ManyToOne} from 'typeorm';
import { DailyValueSchema } from '../DailyValue/DailyValueSchema';
import { FoodNutritionSchema } from '../FoodNutrition/FoodNutritionSchema';

export interface NutrientDto {
    nutr_no: string;
    units: string;
    tagname: string;
    nutrDesc: string;
    num_dec: string;
    sr_order: number;

    dailyValue: DailyValueSchema;
    foodNutritions: FoodNutritionSchema[];
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
    @Column()
    public num_dec: string;
    @Column()
    public sr_order: number;

    @OneToOne(type => DailyValueSchema, dailyValue => dailyValue.nutrient)
    public dailyValue: DailyValueSchema;
    @ManyToOne(type => FoodNutritionSchema, foodNutrition => foodNutrition.nutrient)
    public foodNutritions: FoodNutritionSchema[];
}
