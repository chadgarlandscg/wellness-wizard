import { DailyValueDto } from './DailyValueSchema';

export class DailyValue {
    constructor(
        private units: string,
        private value: number,
        private nutrNo: string,
        private id?: number,
    ) {}
    get getUnits(): string {
        return this.units;
    }
    get getValue(): number {
        return this.value;
    }
    get getNutrNo(): string {
        return this.nutrNo;
    }
    get getId(): number {
        return this.id;
    }
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
