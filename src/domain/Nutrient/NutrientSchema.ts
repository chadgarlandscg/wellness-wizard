import {Entity, Column, PrimaryColumn} from 'typeorm';

export interface NutrientDto {
    nutr_no: string;
    units: string;
    tagname: string;
    nutrDesc: string;
    num_dec: string;
    sr_order: number;
}

/**
 * TypeORM Schema Config
 */
@Entity('nutr_def')
export class NutrientSchema implements NutrientDto {
    @PrimaryColumn()
    public nutr_no: string;
    @Column()
    public units: string;
    @Column()
    public tagname: string;
    @Column()
    public nutrDesc: string;
    @Column()
    public num_dec: string;
    @Column()
    public sr_order: number;
}
