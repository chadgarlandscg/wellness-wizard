import {injectable, inject} from 'inversify';
import {DailyValue} from '../model/DailyValue';
import {DailyValueRepository} from '../repository/DailyValueRepository';
import TYPES from '../types';
import {DailyValueDto} from '../model/DailyValueSchema';

export interface DailyValueService {
    getDailyValues(): Promise<Array<DailyValue>>;
    getDailyValue(id: string): Promise<DailyValue>;
}

@injectable()
export class DailyValueServiceImpl implements DailyValueService {
    @inject(TYPES.DailyValueRepository)
    private dailyValueRepository: DailyValueRepository;

    public async getDailyValues(): Promise<Array<DailyValue>> {
        const dailyValues: Array<DailyValue> = await this.dailyValueRepository.findAll().then(
            (dailyValueDtoList: DailyValueDto[]) =>
                dailyValueDtoList.map((dto: DailyValueDto) => {
                    return this.toDailyValue(dto);
                })
        );

        return dailyValues;
    }

    public async getDailyValue(id: string): Promise<DailyValue> {
        const dailyValue = await this.dailyValueRepository.find(id).then((dailyValueDto: DailyValueDto) => {
            return this.toDailyValue(dailyValueDto);
        });

        return dailyValue;
    }

    // private toDailyValueDto(dailyValue: DailyValue): DailyValueDto {
    //     return {
    //         units: dailyValue.getUnits,
    //         value: dailyValue.getValue,
    //         nutr_no: dailyValue.getNutrNo,
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
