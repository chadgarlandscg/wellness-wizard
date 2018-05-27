import {injectable, inject} from 'inversify';
import {DailyValueDTO, DailyValueDbSchema} from '../model/DailyValueSchema';
import {logger} from '../util/Logger';
import {Repository} from 'typeorm';
import TYPES from '../types';

export interface DailyValueDao {
    findAll(): Promise<Array<DailyValueDTO>>;
    find(id: string): Promise<DailyValueDTO>;
}

@injectable()
export class DailyValueDaoImpl implements DailyValueDao {
    private readonly dailyValueRepository: Repository<DailyValueDbSchema>;
    public constructor(
        @inject(TYPES.DailyValueRepository) dailyValueRepository: Repository<DailyValueDbSchema>
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
