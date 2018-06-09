import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { FoodSchema, FoodDto } from '../Food/FoodSchema';
import { UsdaSelectionEventSchema, UsdaSelectionEventDto } from '../UsdaSelectionEvent/UsdaSelectionEventSchema';
import { EAGER } from '../../util/DecoratorHelper';

export interface UsdaSelectionDto {
    usda_selection_id: number;
    ndb_no: string;
    weight_id: number;
    servings: number;

    food?: FoodDto[];
    usdaSelectionEvents?: UsdaSelectionEventDto[];
}

/**
 * TypeORM Schema Config
 */
@Entity('usda_selection')
export class UsdaSelectionSchema implements UsdaSelectionDto {
    @PrimaryGeneratedColumn()
    public usda_selection_id: number;
    @Column()
    public ndb_no: string;
    @Column()
    public weight_id: number;
    @Column()
    public servings: number;

    @ManyToOne(type => FoodSchema, food => food.usdaSelections)
    @JoinColumn({name: 'ndb_no'})
    public food: FoodSchema[];
    @OneToMany(type => UsdaSelectionEventSchema, usdaSelectionEvent => usdaSelectionEvent.usdaSelection)
    public usdaSelectionEvents: UsdaSelectionEventSchema[];
}
