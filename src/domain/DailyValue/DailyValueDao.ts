import {Repository} from 'typeorm';
import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {DailyValueDto, DailyValueSchema} from './DailyValueSchema';

export interface DailyValueDao {
    findAll(): Promise<DailyValueDto[]>;
    find(id: string): Promise<DailyValueDto>;
}

@injectable()
export class DailyValueDaoImpl implements DailyValueDao {
    @inject(TYPES.DailyValueRepository)
    private readonly dailyValueRepository: Repository<DailyValueSchema>;

    public async findAll(): Promise<DailyValueDto[]> {
        return await this.dailyValueRepository.find();
    }
    public async find(id: string): Promise<DailyValueDto> {
        return await this.dailyValueRepository.findOne(id);
    }
}
