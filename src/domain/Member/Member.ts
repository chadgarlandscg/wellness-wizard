import MetabolicProfile from './MetabolicProfile';
import { MemberDto } from './MemberSchema';
import { MetabolicEventMapper, MetabolicEvent } from '../MetabolicEvent/MetabolicEvent';

export class Member {
    public metabolicProfile: MetabolicProfile;
    constructor(
        public memberId: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public metric: boolean,
        public gender: number,
        public weight: number,
        public height: number,
        public targetWeightChange: number,
        public birthDate: Date,
        public activityLevel: string,
        public createdTimestamp: Date,
        public updatedTimestamp: Date,

        public metabolicEvents: MetabolicEvent[],
    ) {
    }
}

export class MemberMapper {
    public static toMemberDto(member: Member): MemberDto {
        return {
            member_id: member.memberId,
            first_name: member.firstName,
            last_name: member.lastName,
            email: member.email,
            metric: member.metric,
            gender: member.gender,
            weight: member.weight,
            height: member.height,
            target_weight_change: member.targetWeightChange,
            birth_date: member.birthDate,
            activity_level: member.activityLevel,
            created_timestamp: member.createdTimestamp,
            updated_timestamp: member.updatedTimestamp,

            metabolicEvents: member.metabolicEvents && MetabolicEventMapper.toMetabolicEventDtos(member.metabolicEvents),
        };
    }

    public static toMember(memberDto: MemberDto): Member {
        return new Member(
            memberDto.member_id,
            memberDto.first_name,
            memberDto.last_name,
            memberDto.email,
            memberDto.metric,
            memberDto.gender,
            memberDto.weight,
            memberDto.height,
            memberDto.target_weight_change,
            memberDto.birth_date,
            memberDto.activity_level,
            memberDto.created_timestamp,
            memberDto.updated_timestamp,

            memberDto.metabolicEvents && MetabolicEventMapper.toMetabolicEvents(memberDto.metabolicEvents),
        );
    }

    public static toMembers(memberDtos: MemberDto[]): Member[] {
        return memberDtos.map(this.toMember);
    }
}
