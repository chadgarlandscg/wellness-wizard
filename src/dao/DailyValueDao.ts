import {injectable, inject} from 'inversify';
import {DailyValueDTO, DailyValueSchema} from '../model/DailyValueSchema';
import {Repository} from 'typeorm';
import TYPES from '../types';

export interface DailyValueDao {
    findAll(): Promise<Array<DailyValueDTO>>;
    find(id: string): Promise<DailyValueDTO>;
}

@injectable()
export class DailyValueDaoImpl implements DailyValueDao {
    private readonly dailyValueRepository: Repository<DailyValueSchema>;
    public constructor(
        @inject(TYPES.DailyValueRepository) dailyValueRepository: Repository<DailyValueSchema>
    ) {
        this.dailyValueRepository = dailyValueRepository;
    }

    public async findAll(): Promise<Array<DailyValueDTO>> {
        return await this.dailyValueRepository.find();
    }
    public async find(id: string): Promise<DailyValueDTO> {
        return await this.dailyValueRepository.findOne(id);
    }
}
