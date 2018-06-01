import {Entity, Column, PrimaryColumn, JoinColumn, ManyToOne} from 'typeorm';
import { NutrientSchema, NutrientDto } from '../Nutrient/NutrientSchema';
import { FoodSchema, FoodDto } from '../Food/FoodSchema';
import { HIDE } from '../../util/DecoratorHelper';

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

    nutrient: NutrientDto;
    food: FoodDto;
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
    @Column(HIDE)
    public num_data_pts: number;
    @Column(HIDE)
    public std_error: number;
    @Column(HIDE)
    public src_cd: string;
    @Column(HIDE)
    public deriv_cd: string;
    @Column(HIDE)
    public ref_ndb_no: string;
    @Column(HIDE)
    public add_nutr_mark: string;
    @Column(HIDE)
    public num_studies: number;
    @Column(HIDE)
    public min: number;
    @Column(HIDE)
    public max: number;
    @Column(HIDE)
    public df: number;
    @Column(HIDE)
    public low_eb: number;
    @Column(HIDE)
    public up_eb: number;
    @Column(HIDE)
    public stat_cmt: string;
    @Column(HIDE)
    public addmod_date: string;
    @Column(HIDE)
    public cc: string;

    @ManyToOne(type => NutrientSchema, nutrient => nutrient.foodNutritions)
    @JoinColumn({name: 'nutr_no'})
    public nutrient: NutrientSchema;
    @ManyToOne(type => FoodSchema, food => food.foodNutritions)
    @JoinColumn({name: 'ndb_no'})
    public food: FoodSchema;
}
