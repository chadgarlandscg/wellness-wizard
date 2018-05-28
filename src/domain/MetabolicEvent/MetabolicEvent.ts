import { Member, MemberMapper } from '../Member/Member';
import { MetabolicEventDto } from './MetabolicEventSchema';

export class MetabolicEvent {
    constructor(
        public memberMetabolicEventId: number,
        public memberId: number,
        public description: string,
        public scheduledTimestamp: Date,
        public occurredDate: Date,
        public occurredTime: Date,

        public member: Member,
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
        };
    }

    public static toMetabolicEventDtos(metabolicEvents: MetabolicEvent[]): MetabolicEventDto[] {
        return metabolicEvents.map(this.toMetabolicEventDto);
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
        );
    }

    public static toMetabolicEvents(metabolicEventDtos: MetabolicEventDto[]): MetabolicEvent[] {
        return metabolicEventDtos.map(this.toMetabolicEvent);
    }
}
