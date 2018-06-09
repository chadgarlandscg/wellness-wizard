import {Entity, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { MetabolicEventSchema, MetabolicEventDto } from '../MetabolicEvent/MetabolicEventSchema';
import { UsdaSelectionSchema, UsdaSelectionDto } from '../UsdaSelection/UsdaSelectionSchema';
import { CASCADE, CASCADE_EAGER } from '../../util/DecoratorHelper';

export interface UsdaSelectionEventDto {
    member_metabolic_event_id: number;
    usda_selection_id: number;

    metabolicEvent?: MetabolicEventDto;
    usdaSelection?: UsdaSelectionDto;
}

/**
 * TypeORM Schema Config
 */
@Entity('metabolic_event_usda_selection')
export class UsdaSelectionEventSchema implements UsdaSelectionEventDto {
    @PrimaryColumn()
    public member_metabolic_event_id: number;
    @PrimaryColumn()
    public usda_selection_id: number;

    @ManyToOne(type => MetabolicEventSchema, metabolicEvent => metabolicEvent.usdaSelectionEvents)
    @JoinColumn({name: 'member_metabolic_event_id'})
    public metabolicEvent: MetabolicEventSchema;
    @ManyToOne(type => UsdaSelectionSchema, usdaSelection => usdaSelection.usdaSelectionEvents, CASCADE_EAGER)
    @JoinColumn({name: 'usda_selection_id'})
    public usdaSelection: UsdaSelectionSchema;
}
