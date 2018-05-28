import {Repository, Like} from 'typeorm';
import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {MetabolicEventDto, MetabolicEventSchema} from './MetabolicEventSchema';

export interface MetabolicEventDao {
    create(metabolicEvent: MetabolicEventDto): Promise<MetabolicEventDto>;
    findAll(): Promise<MetabolicEventDto[]>;
    find(id: string): Promise<MetabolicEventDto>;
    search(query: string): Promise<MetabolicEventDto[]>;
}

@injectable()
export class MetabolicEventDaoImpl implements MetabolicEventDao {
    @inject(TYPES.MetabolicEventRepository)
    private readonly metabolicEventRepository: Repository<MetabolicEventSchema>;

    public async create(metabolicEvent: MetabolicEventDto): Promise<MetabolicEventDto> {
        return await this.metabolicEventRepository.save(metabolicEvent);
    }
    public async findAll(): Promise<MetabolicEventDto[]> {
        return await this.metabolicEventRepository.find();
    }
    public async find(id: string): Promise<MetabolicEventDto> {
        return await this.metabolicEventRepository.findOne(id, {relations: ['member']});
    }
    public async search(query: string): Promise<MetabolicEventDto[]> {
        return await this.metabolicEventRepository.find({
            where: {
                description: Like(`%${query}%`),
            },
            take: 5,
            cache: true,
        });
    }
}
