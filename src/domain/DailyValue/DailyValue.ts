import { DailyValueDto } from './DailyValueSchema';

export class DailyValue {
    constructor(
        public units: string,
        public value: number,
        public nutrNo: string,
        public id?: number,
    ) {}
}

export class DailyValueMapper {
    public static toDailyValue(dailyValueDto: DailyValueDto): DailyValue {
        return new DailyValue(
            dailyValueDto.units,
            dailyValueDto.value,
            dailyValueDto.nutr_no,
            dailyValueDto.id);
    }
    public static toDailyValues(dailyValueDtos: DailyValueDto[]): DailyValue[] {
        return dailyValueDtos.map(DailyValueMapper.toDailyValue);
    }
}
