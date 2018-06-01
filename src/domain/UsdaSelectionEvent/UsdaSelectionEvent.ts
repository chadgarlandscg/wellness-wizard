import { UsdaSelectionEventDto } from './UsdaSelectionEventSchema';
import { UsdaSelection, UsdaSelectionMapper } from '../UsdaSelection/UsdaSelection';

export class UsdaSelectionEvent {
    constructor(
        public memberMetabolicEventId: number,
        public usdaSelectionId: number,

        public usdaSelection?: UsdaSelection
    ) {}
}

export class UsdaSelectionEventMapper {
    public static toUsdaSelectionEventDto(usdaSelectionEvent: UsdaSelectionEvent): UsdaSelectionEventDto {
        return {
            member_metabolic_event_id: usdaSelectionEvent.memberMetabolicEventId,
            usda_selection_id: usdaSelectionEvent.usdaSelectionId,

            usdaSelection: usdaSelectionEvent.usdaSelection && UsdaSelectionMapper.toUsdaSelectionDto(usdaSelectionEvent.usdaSelection),
        };
    }
    public static toUsdaSelectionEventDtos(usdaSelections: UsdaSelectionEvent[]): UsdaSelectionEventDto[] {
        return usdaSelections.map(UsdaSelectionEventMapper.toUsdaSelectionEventDto);
    }

    public static toUsdaSelectionEvent(usdaSelectionEventDto: UsdaSelectionEventDto): UsdaSelectionEvent {
        return new UsdaSelectionEvent(
            usdaSelectionEventDto.member_metabolic_event_id,
            usdaSelectionEventDto.usda_selection_id,

            usdaSelectionEventDto.usdaSelection && UsdaSelectionMapper.toUsdaSelection(usdaSelectionEventDto.usdaSelection),
        );
    }

    public static toUsdaSelectionEvents(usdaSelectionEventDtos: UsdaSelectionEventDto[]): UsdaSelectionEvent[] {
        return usdaSelectionEventDtos.map(UsdaSelectionEventMapper.toUsdaSelectionEvent);
    }
}
