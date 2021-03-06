import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {Member, MemberMapper} from './Member';
import {MemberDao} from './MemberDao';
import MetabolicProfile from './MetabolicProfile';

export interface MemberService {
    createMember(member: Member): Promise<Member>;
    getMembers(): Promise<Member[]>;
    getMember(id: string): Promise<Member>;
    searchMembers(query: string): Promise<Member[]>;
}

@injectable()
export class MemberServiceImpl implements MemberService {
    @inject(TYPES.MemberDao)
    private memberDao: MemberDao;

    public async createMember(member: Member): Promise<Member> {
        const newMemberDto = await this.memberDao.create(MemberMapper.toMemberDto(member));
        const newMember = MemberMapper.toMember(newMemberDto);
        newMember.metabolicProfile = new MetabolicProfile(newMember);
        return newMember;
    }

    public async getMembers(): Promise<Member[]> {
        return await this.memberDao
            .findAll()
            .then(MemberMapper.toMembers);
    }

    public async getMember(id: string): Promise<Member> {
        return await this.memberDao
            .find(id)
            .then(MemberMapper.toMember);
    }

    public async searchMembers(query: string): Promise<Member[]> {
        return await this.memberDao
            .search(query)
            .then(MemberMapper.toMembers);
    }
}
