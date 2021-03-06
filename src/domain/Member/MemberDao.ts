import {Repository, Like} from 'typeorm';
import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {MemberDto, MemberSchema} from './MemberSchema';

export interface MemberDao {
    create(member: MemberDto): Promise<MemberDto>;
    findAll(): Promise<MemberDto[]>;
    find(id: string): Promise<MemberDto>;
    search(query: string): Promise<MemberDto[]>;
}

@injectable()
export class MemberDaoImpl implements MemberDao {
    @inject(TYPES.MemberRepository)
    private readonly memberRepository: Repository<MemberSchema>;

    public async create(member: MemberDto): Promise<MemberDto> {
        return await this.memberRepository.save(member);
    }
    public async findAll(): Promise<MemberDto[]> {
        return await this.memberRepository.find();
    }
    public async find(id: string): Promise<MemberDto> {
        return await this.memberRepository.findOne(id, {relations: ['metabolicEvents']});
    }
    public async search(query: string): Promise<MemberDto[]> {
        return await this.memberRepository.find({
            where: {
                first_name: Like(`%${query}%`),
            },
            take: 5,
            cache: true,
        });
    }
}
