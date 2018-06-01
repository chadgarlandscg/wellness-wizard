import { UsdaSelectionEventDto } from './UsdaSelectionEventSchema';

export class UsdaSelectionEvent {
    constructor(
        public memberMetabolicEventId: number,
        public usdaSelectionId: number,
    ) {}
}

export class UsdaSelectionEventMapper {
    public static toUsdaSelectionEventDto(usdaSelectionEvent: UsdaSelectionEvent): UsdaSelectionEventDto {
        return {
            member_metabolic_event_id: usdaSelectionEvent.memberMetabolicEventId,
            usda_selection_id: usdaSelectionEvent.usdaSelectionId,
        };
    }
    public static toUsdaSelectionEventDtos(usdaSelections: UsdaSelectionEvent[]): UsdaSelectionEventDto[] {
        return usdaSelections.map(UsdaSelectionEventMapper.toUsdaSelectionEventDto);
    }

    public static toUsdaSelectionEvent(usdaSelectionEventDto: UsdaSelectionEventDto): UsdaSelectionEvent {
        return new UsdaSelectionEvent(
            usdaSelectionEventDto.member_metabolic_event_id,
            usdaSelectionEventDto.usda_selection_id,
        );
    }

    public static toUsdaSelectionEvents(usdaSelectionEventDtos: UsdaSelectionEventDto[]): UsdaSelectionEvent[] {
        return usdaSelectionEventDtos.map(UsdaSelectionEventMapper.toUsdaSelectionEvent);
    }
}
