import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {DailyValue} from './DailyValue';
import {DailyValueDao} from './DailyValueDao';
import {DailyValueDto} from './DailyValueSchema';

export interface DailyValueService {
    getDailyValues(): Promise<Array<DailyValue>>;
    getDailyValue(id: string): Promise<DailyValue>;
}

@injectable()
export class DailyValueServiceImpl implements DailyValueService {
    @inject(TYPES.DailyValueDao)
    private dailyValueDao: DailyValueDao;

    public async getDailyValues(): Promise<Array<DailyValue>> {
        return await this.dailyValueDao.findAll().then(
            dtos => dtos.map(
                (dto: DailyValueDto) => this.toDailyValue(dto)
            )
        );
    }

    public async getDailyValue(id: string): Promise<DailyValue> {
        return await this.dailyValueDao.find(id).then(
            dto => this.toDailyValue(dto)
        );
    }

    // private toDailyValueDto(dailyValue: DailyValue): DailyValueDto {
    //     return {
    //         units: dailyValue.getUnits,
    //         value: dailyValue.getValue,
    //         nutrNo: dailyValue.getNutrNo,
    //         id: dailyValue.getId
    //     };
    // }

    private toDailyValue(dailyValueDto: DailyValueDto): DailyValue {
        return new DailyValue(
            dailyValueDto.units,
            dailyValueDto.value,
            dailyValueDto.nutr_no,
            dailyValueDto.id);
    }
}
