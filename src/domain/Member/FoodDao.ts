import {Repository, Like} from 'typeorm';
import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {MemberDto, MemberSchema} from './MemberSchema';

export interface MemberDao {
    findAll(): Promise<MemberDto[]>;
    find(id: string): Promise<MemberDto>;
    search(query: string): Promise<MemberDto[]>;
}

@injectable()
export class MemberDaoImpl implements MemberDao {
    @inject(TYPES.MemberRepository)
    private readonly memberRepository: Repository<MemberSchema>;

    public async findAll(): Promise<MemberDto[]> {
        return await this.memberRepository.find();
    }
    public async find(id: string): Promise<MemberDto> {
        return await this.memberRepository.findOne(id, {
            relations: ['memberNutritions', 'memberGroup']
        });
        // const users = await connection.getRepository(User).find({ relations: ["profile", "photos", "videos"] });
    }
    public async search(query: string): Promise<MemberDto[]> {
        return await this.memberRepository.find({
            where: {
                long_desc: Like(`%${query}%`),
                // shrt_desc: Like(`%${query}%`),
                // comname: Like(`%${query}%`),
                // manufacname: Like(`%${query}%`),
            },
            take: 5,
            cache: true,
        });
    }
}
