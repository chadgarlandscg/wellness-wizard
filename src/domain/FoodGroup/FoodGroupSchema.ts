import {Entity, Column, PrimaryColumn} from 'typeorm';

export interface FoodGroupDto {
    fdgrp_cd: string;
    fdgrp_desc: string;
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
}
