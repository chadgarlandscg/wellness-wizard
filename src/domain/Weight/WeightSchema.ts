import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn} from 'typeorm';
import { FoodSchema } from '../Food/FoodSchema';

export interface WeightDto {
    weight_id: number;
    ndb_no: string;
    seq: string;
    amount: number;
    msre_desc: string;
    gm_wgt: number;
    num_data_pts: number;
    std_dev: number;

    food: FoodSchema;
}

/**
 * TypeORM Schema Config
 */
@Entity('weight')
export class WeightSchema implements WeightDto {
    @PrimaryColumn()
    public weight_id: number;
    @PrimaryColumn()
    public ndb_no: string;
    @PrimaryColumn()
    public seq: string;
    @Column()
    public amount: number;
    @Column()
    public msre_desc: string;
    @Column()
    public gm_wgt: number;
    @Column()
    public num_data_pts: number;
    @Column()
    public std_dev: number;

    @OneToMany(type => FoodSchema, food => food.weights)
    @JoinColumn()
    public food: FoodSchema;
}
