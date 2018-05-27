import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {DailyValue} from './DailyValue';
import {DailyValueDao} from './DailyValueDao';
import {DailyValueDTO} from './DailyValueSchema';

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
                (dto: DailyValueDTO) => this.toDailyValue(dto)
            )
        );
    }

    public async getDailyValue(id: string): Promise<DailyValue> {
        return await this.dailyValueDao.find(id).then(
            dto => this.toDailyValue(dto)
        );
    }

    // private toDailyValueDTO(dailyValue: DailyValue): DailyValueDTO {
    //     return {
    //         units: dailyValue.getUnits,
    //         value: dailyValue.getValue,
    //         nutrNo: dailyValue.getNutrNo,
    //         id: dailyValue.getId
    //     };
    // }

    private toDailyValue(dailyValueDTO: DailyValueDTO): DailyValue {
        return new DailyValue(
            dailyValueDTO.units,
            dailyValueDTO.value,
            dailyValueDTO.nutr_no,
            dailyValueDTO.id);
    }
}
