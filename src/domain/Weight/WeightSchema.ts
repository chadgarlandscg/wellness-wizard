import {Entity, Column, PrimaryColumn, JoinColumn, ManyToOne} from 'typeorm';
import { FoodSchema, FoodDto } from '../Food/FoodSchema';
import { HIDE } from '../../util/DecoratorHelper';

export interface WeightDto {
    weight_id: number;
    ndb_no: string;
    seq: string;
    amount: number;
    msre_desc: string;
    gm_wgt: number;
    num_data_pts: number;
    std_dev: number;

    food: FoodDto;
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
    @Column(HIDE)
    public num_data_pts: number;
    @Column(HIDE)
    public std_dev: number;

    @ManyToOne(type => FoodSchema, food => food.weights)
    @JoinColumn({name: 'ndb_no', referencedColumnName: 'ndb_no'})
    public food: FoodSchema;
}
