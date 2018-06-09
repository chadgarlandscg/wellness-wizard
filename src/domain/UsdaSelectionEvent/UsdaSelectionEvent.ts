import { UsdaSelectionEventDto } from './UsdaSelectionEventSchema';
import { UsdaSelection, UsdaSelectionMapper } from '../UsdaSelection/UsdaSelection';

export class UsdaSelectionEvent {
    public memberMetabolicEventId?: number;
    public usdaSelectionId?: number;

    public usdaSelection?: UsdaSelection;
    constructor(usdaSelectionEvent: UsdaSelectionEvent = {} as UsdaSelectionEvent) {
        let {
            memberMetabolicEventId,
            usdaSelectionId,

            usdaSelection,
        } = usdaSelectionEvent;

        this.memberMetabolicEventId = memberMetabolicEventId;
        this.usdaSelectionId = usdaSelectionId;
        this.usdaSelection = usdaSelection;
    }
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
        return new UsdaSelectionEvent({
            memberMetabolicEventId: usdaSelectionEventDto.member_metabolic_event_id,
            usdaSelectionId: usdaSelectionEventDto.usda_selection_id,
            usdaSelection: usdaSelectionEventDto.usdaSelection && UsdaSelectionMapper.toUsdaSelection(usdaSelectionEventDto.usdaSelection),
        });
    }

    public static toUsdaSelectionEvents(usdaSelectionEventDtos: UsdaSelectionEventDto[]): UsdaSelectionEvent[] {
        return usdaSelectionEventDtos.map(UsdaSelectionEventMapper.toUsdaSelectionEvent);
    }
    // public static toUsdaSelection(usdaSelectionEventDto: UsdaSelectionEventDto): UsdaSelection {
    //     return new UsdaSelection(
    //         usdaSelectionId: usdaSelectionEventDto.usda_selection_id,
    //         usdaSelection: usdaSelectionEventDto.usdaSelection && UsdaSelectionMapper.toUsdaSelection(usdaSelectionEventDto.usdaSelection),
    //     })
    // }
    // public static toUsdaSelections(usdaSelectionEventDtos: UsdaSelectionEventDto[]): UsdaSelection[] {
    //     return usdaSelectionEventDtos.map(UsdaSelectionEventMapper.toUsdaSelection);
    // }
}
