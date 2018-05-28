import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {Member} from './Member';
import {MemberDao} from './MemberDao';
import {MemberDto} from './MemberSchema';
import MetabolicProfile from './MetabolicProfile';

export interface MemberService {
    createMember(member: Member): Promise<Member>;
    getMembers(): Promise<Array<Member>>;
    getMember(id: string): Promise<Member>;
    searchMembers(query: string): Promise<Member[]>;
}

@injectable()
export class MemberServiceImpl implements MemberService {
    @inject(TYPES.MemberDao)
    private memberDao: MemberDao;

    constructor() {
        this.toMemberDto = this.toMemberDto.bind(this);
        this.toMember = this.toMember.bind(this);
        this.toMembers = this.toMembers.bind(this);
    }

    public async createMember(member: Member): Promise<Member> {
        const newMemberDto = await this.memberDao.create(this.toMemberDto(member));
        const newMember = this.toMember(newMemberDto);
        newMember.metabolicProfile = new MetabolicProfile(newMember);
        return newMember;
    }

    public async getMembers(): Promise<Array<Member>> {
        return await this.memberDao.findAll().then(
            dtos => dtos.map(
                (dto: MemberDto) => this.toMember(dto)
            )
        );
    }

    public async getMember(id: string): Promise<Member> {
        return await this.memberDao.find(id).then(
            dto => this.toMember(dto)
        );
    }

    public async searchMembers(query: string): Promise<Member[]> {
        return await this.memberDao.search(query).then(this.toMembers);
    }

    private toMemberDto(member: Member): MemberDto {
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

            metabolicEvents: member.metabolicEvents,
        };
    }

    private toMember(memberDto: MemberDto): Member {
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

            memberDto.metabolicEvents,
        );
    }

    private toMembers(memberDtos: MemberDto[]): Member[] {
        return memberDtos.map(this.toMember);
    }
}
