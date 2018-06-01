import {Entity, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany} from 'typeorm';
import { MetabolicEventSchema, MetabolicEventDto } from '../MetabolicEvent/MetabolicEventSchema';
import { UsdaSelectionSchema, UsdaSelectionDto } from '../UsdaSelection/UsdaSelectionSchema';

export interface UsdaSelectionEventDto {
    member_metabolic_event_id: number;
    usda_selection_id: number;

    metabolicEvent?: MetabolicEventDto;
    usdaSelections?: UsdaSelectionDto[];
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
    @ManyToMany(type => UsdaSelectionSchema, usdaSelection => usdaSelection.usdaSelectionEvents)
    @JoinColumn({name: 'usda_selection_id'})
    public usdaSelections: UsdaSelectionSchema[];
}
