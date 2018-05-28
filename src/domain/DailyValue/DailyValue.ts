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
