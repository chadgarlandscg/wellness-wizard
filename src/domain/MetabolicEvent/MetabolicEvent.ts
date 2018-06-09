import { Member, MemberMapper } from '../Member/Member';
import { MetabolicEventDto } from './MetabolicEventSchema';
import { UsdaSelectionEvent, UsdaSelectionEventMapper } from '../UsdaSelectionEvent/UsdaSelectionEvent';
import { UsdaSelection, UsdaSelectionMapper } from '../UsdaSelection/UsdaSelection';
import { UsdaSelectionEventDto } from '../UsdaSelectionEvent/UsdaSelectionEventSchema';

export class MetabolicEvent {
    constructor(
        public memberMetabolicEventId: number,
        public memberId: number,
        public description: string,
        public scheduledTimestamp: Date,
        public occurredDate: Date,
        public occurredTime: Date,

        public member: Member,
        public usdaSelections?: UsdaSelection[],
    ) {
    }
}

export class MetabolicEventMapper {
    public static toMetabolicEventDto(metabolicEvent: MetabolicEvent): MetabolicEventDto {
        return {
            member_metabolic_event_id: metabolicEvent.memberMetabolicEventId,
            member_id: metabolicEvent.memberId,
            description: metabolicEvent.description,
            scheduled_timestamp: metabolicEvent.scheduledTimestamp,
            occurred_date: metabolicEvent.occurredDate,
            occurred_time: metabolicEvent.occurredTime,

            member: metabolicEvent.member && MemberMapper.toMemberDto(metabolicEvent.member),
            // usdaSelectionEvents: metabolicEvent.usdaSelectionEvents && UsdaSelectionEventMapper.toUsdaSelectionEventDtos(metabolicEvent.usdaSelectionEvents),
            usdaSelectionEvents: metabolicEvent.usdaSelections && MetabolicEventMapper.toUsdaSelectionEventDtos(metabolicEvent.usdaSelections),
        };
    }

    public static toMetabolicEventDtos(metabolicEvents: MetabolicEvent[]): MetabolicEventDto[] {
        return metabolicEvents.map(MetabolicEventMapper.toMetabolicEventDto);
    }

    public static toMetabolicEvent(metabolicEventDto: MetabolicEventDto): MetabolicEvent {
        return new MetabolicEvent(
            metabolicEventDto.member_metabolic_event_id,
            metabolicEventDto.member_id,
            metabolicEventDto.description,
            metabolicEventDto.scheduled_timestamp,
            metabolicEventDto.occurred_date,
            metabolicEventDto.occurred_time,

            metabolicEventDto.member && MemberMapper.toMember(metabolicEventDto.member),
            metabolicEventDto.usdaSelectionEvents
                && UsdaSelectionMapper.toUsdaSelections(
                    metabolicEventDto.usdaSelectionEvents.map(
                        usdaSelectionEvent => usdaSelectionEvent.usdaSelection
                    )
                ),
        );
    }

    public static toMetabolicEvents(metabolicEventDtos: MetabolicEventDto[]): MetabolicEvent[] {
        return metabolicEventDtos.map(MetabolicEventMapper.toMetabolicEvent);
    }

    public static toUsdaSelectionEventDtos(usdaSelectionEvents: UsdaSelection[]): UsdaSelectionEventDto[] {
        return usdaSelectionEvents.map(MetabolicEventMapper.toUsdaSelectionEventDto);
    }

    public static toUsdaSelectionEventDto(usdaSelection: UsdaSelection): UsdaSelectionEventDto {
        return UsdaSelectionEventMapper.toUsdaSelectionEventDto(new UsdaSelectionEvent({
            usdaSelection: usdaSelection as UsdaSelection,
        }));
    }
}
