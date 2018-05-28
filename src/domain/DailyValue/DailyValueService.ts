import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {DailyValue, DailyValueMapper} from './DailyValue';
import {DailyValueDao} from './DailyValueDao';

export interface DailyValueService {
    getDailyValues(): Promise<DailyValue[]>;
    getDailyValue(id: string): Promise<DailyValue>;
}

@injectable()
export class DailyValueServiceImpl implements DailyValueService {
    @inject(TYPES.DailyValueDao)
    private dailyValueDao: DailyValueDao;

    public async getDailyValues(): Promise<DailyValue[]> {
        return await this.dailyValueDao
            .findAll()
            .then(DailyValueMapper.toDailyValues);
    }

    public async getDailyValue(id: string): Promise<DailyValue> {
        return await this.dailyValueDao
            .find(id)
            .then(DailyValueMapper.toDailyValue);
    }
}
