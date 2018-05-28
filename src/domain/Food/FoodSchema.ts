import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { FoodGroupSchema } from '../FoodGroup/FoodGroupSchema';
import { WeightSchema } from '../Weight/WeightSchema';
import { FoodNutritionSchema } from '../FoodNutrition/FoodNutritionSchema';
import { HIDE } from '../../util/DecoratorHelper';

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
    @Column(HIDE)
    public survey: string;
    @Column(HIDE)
    public ref_desc: string;
    @Column(HIDE)
    public refuse: number;
    @Column(HIDE)
    public sciname: string;
    @Column(HIDE)
    public n_factor: number;
    @Column(HIDE)
    public pro_factor: number;
    @Column(HIDE)
    public fat_factor: number;
    @Column(HIDE)
    public cho_factor: number;

    @ManyToOne(type => FoodGroupSchema, foodGroup => foodGroup.foods)
    @JoinColumn({name: 'fdgrp_cd'})
    public foodGroup: FoodGroupSchema;
    @OneToMany(type => WeightSchema, weight => weight.food)
    @JoinColumn({name: 'ndb_no', referencedColumnName: 'ndb_no'})
    public weights: WeightSchema[];
    @OneToMany(type => FoodNutritionSchema, foodNutrition => foodNutrition.food)
    @JoinColumn({name: 'ndb_no'})
    public foodNutritions: FoodNutritionSchema[];
}
