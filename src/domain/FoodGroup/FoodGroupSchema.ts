import {Entity, Column, PrimaryColumn, JoinColumn, OneToMany} from 'typeorm';
import { FoodSchema, FoodDto } from '../Food/FoodSchema';

export interface FoodGroupDto {
    fdgrp_cd: string;
    fdgrp_desc: string;

    foods: FoodDto[];
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

    @OneToMany(type => FoodSchema, food => food.foodGroup)
    @JoinColumn({name: 'fdgrp_cd'})
    public foods: FoodSchema[];
}
