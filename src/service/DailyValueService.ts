import {injectable, inject} from 'inversify';
import {DailyValue} from '../model/DailyValue';
import {DailyValueRepository} from '../repository/DailyValueRepository';
import TYPES from '../types';
import {DailyValueDTO} from '../model/DailyValueSchema';
import * as _ from 'lodash';

export interface DailyValueService {
    getDailyValues(): Promise<Array<DailyValue>>;
    getDailyValue(id: string): Promise<DailyValue>;
}

@injectable()
export class DailyValueServiceImpl implements DailyValueService {
    @inject(TYPES.DailyValueRepository)
    private dailyValueRepositoryDb: DailyValueRepository;

    public async getDailyValues(): Promise<Array<DailyValue>> {
        // grab dailyValues from db
        const dailyValuesDb: Array<DailyValue> = await this.dailyValueRepositoryDb.findAll().then((a) => a.map((dto: DailyValueDTO) => {
            return this.toDailyValueDTO(dto);
        }));

        return _.uniqBy(dailyValuesDb, 'id');
    }

    public async getDailyValue(id: string): Promise<DailyValue> {
        const dailyValue = await this.dailyValueRepositoryDb.find(id).then((a) => {
            return this.toDailyValueDTO(a);
        });

        return dailyValue;
    }

    // private toDailyValue(dailyValue: DailyValue): DailyValueDTO {
    //     return {
    //         units: dailyValue.getUnits,
    //         value: dailyValue.getValue,
    //         nutrNo: dailyValue.getNutrNo,
    //         id: dailyValue.getId
    //     };
    // }

    private toDailyValueDTO(dailyValueDTO: DailyValueDTO): DailyValue {
        return new DailyValue(
            dailyValueDTO.units,
            dailyValueDTO.value,
            dailyValueDTO.nutr_no,
            dailyValueDTO.id);
    }
}
