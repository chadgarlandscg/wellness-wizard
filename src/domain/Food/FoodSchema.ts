import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { FoodGroupSchema } from '../FoodGroup/FoodGroupSchema';
import { WeightSchema } from '../Weight/WeightSchema';
import { FoodNutritionSchema } from '../FoodNutrition/FoodNutritionSchema';

export interface FoodDto {
    ndb_no: string;
    fdgrp_cd: string;
    long_desc: string;
    shrt_desc: string;
    comname: string;
    manufacname: string;
    survey: string;
    ref_desc: string;
    refuse: number;
    sciname: string;
    n_factor: number;
    pro_factor: number;
    fat_factor: number;
    cho_factor: number;

    foodGroup: FoodGroupSchema;
    weights: WeightSchema[];
    foodNutritions: FoodNutritionSchema[];
}

/**
 * TypeORM Schema Config
 */
@Entity('food_desc')
export class FoodSchema implements FoodDto {
    @PrimaryColumn()
    public ndb_no: string;
    @Column()
    public fdgrp_cd: string;
    @Column()
    public long_desc: string;
    @Column()
    public shrt_desc: string;
    @Column()
    public comname: string;
    @Column()
    public manufacname: string;
    @Column()
    public survey: string;
    @Column()
    public ref_desc: string;
    @Column()
    public refuse: number;
    @Column()
    public sciname: string;
    @Column()
    public n_factor: number;
    @Column()
    public pro_factor: number;
    @Column()
    public fat_factor: number;
    @Column()
    public cho_factor: number;

    @OneToMany(type => FoodGroupSchema, foodGroup => foodGroup.foods)
    @JoinColumn()
    public foodGroup: FoodGroupSchema;
    @ManyToOne(type => WeightSchema, weight => weight.food)
    public weights: WeightSchema[];
    @ManyToOne(type => FoodNutritionSchema, foodNutrition => foodNutrition.food)
    public foodNutritions: FoodNutritionSchema[];
}
