import {Entity, Column, PrimaryColumn} from 'typeorm';

export interface WeightDto {
    weight_id: number;
    ndb_no: string;
    seq: string;
    amount: number;
    msre_desc: string;
    gm_wgt: number;
    num_data_pts: number;
    std_dev: number;
}

/**
 * TypeORM Schema Config
 */
@Entity('weight')
export class WeightSchema implements WeightDto {
    @PrimaryColumn()
    public weight_id: number;
    @Column()
    public ndb_no: string;
    @Column()
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
}
