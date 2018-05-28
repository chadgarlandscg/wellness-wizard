import {Entity, Column, PrimaryColumn, ManyToOne} from 'typeorm';
import { FoodSchema } from '../Food/FoodSchema';

export interface FoodGroupDto {
    fdgrp_cd: string;
    fdgrp_desc: string;

    foods: FoodSchema[];
}

/**
 * TypeORM Schema Config
 */
@Entity('fd_group')
export class FoodGroupSchema implements FoodGroupDto {
    @PrimaryColumn()
    public fdgrp_cd: string;
    @Column()
    public fdgrp_desc: string;

    @ManyToOne(type => FoodSchema, food => food.foodGroup)
    public foods: FoodSchema[];
}
