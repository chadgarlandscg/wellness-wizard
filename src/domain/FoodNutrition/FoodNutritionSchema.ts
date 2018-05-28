import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn} from 'typeorm';
import { NutrientSchema } from '../Nutrient/NutrientSchema';
import { FoodSchema } from '../Food/FoodSchema';

export interface FoodNutritionDto {
    ndb_no: string;
    nutr_no: string;
    nutr_val: number;
    num_data_pts: number;
    std_error: number;
    src_cd: string;
    deriv_cd: string;
    ref_ndb_no: string;
    add_nutr_mark: string;
    num_studies: number;
    min: number;
    max: number;
    df: number;
    low_eb: number;
    up_eb: number;
    stat_cmt: string;
    addmod_date: string;
    cc: string;

    nutrient: NutrientSchema;
    food: FoodSchema;
}

/**
 * TypeORM Schema Config
 */
@Entity('nut_data')
export class FoodNutritionSchema implements FoodNutritionDto {
    @PrimaryColumn()
    public ndb_no: string;
    @PrimaryColumn()
    public nutr_no: string;
    @Column()
    public nutr_val: number;
    @Column()
    public num_data_pts: number;
    @Column()
    public std_error: number;
    @Column()
    public src_cd: string;
    @Column()
    public deriv_cd: string;
    @Column()
    public ref_ndb_no: string;
    @Column()
    public add_nutr_mark: string;
    @Column()
    public num_studies: number;
    @Column()
    public min: number;
    @Column()
    public max: number;
    @Column()
    public df: number;
    @Column()
    public low_eb: number;
    @Column()
    public up_eb: number;
    @Column()
    public stat_cmt: string;
    @Column()
    public addmod_date: string;
    @Column()
    public cc: string;

    @OneToMany(type => NutrientSchema, nutrient => nutrient.foodNutritions)
    @JoinColumn()
    public nutrient: NutrientSchema;
    @OneToMany(type => FoodSchema, food => food.foodNutritions)
    @JoinColumn()
    public food: FoodSchema;
}
