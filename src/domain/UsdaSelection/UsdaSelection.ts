import { UsdaSelectionDto } from './UsdaSelectionSchema';

export class UsdaSelection {
    constructor(
        public usdaSelectionId: number,
        public ndbNo: string,
        public weightId: number,
        public servings: number,
    ) {}
}

export class UsdaSelectionMapper {
    public static toUsdaSelectionDto(usdaSelection: UsdaSelection): UsdaSelectionDto {
        return {
            usda_selection_id: usdaSelection.usdaSelectionId,
            ndb_no: usdaSelection.ndbNo,
            weight_id: usdaSelection.weightId,
            servings: usdaSelection.servings,
        };
    }
    public static toUsdaSelectionDtos(usdaSelections: UsdaSelection[]): UsdaSelectionDto[] {
        return usdaSelections.map(UsdaSelectionMapper.toUsdaSelectionDto);
    }

    public static toUsdaSelection(usdaSelectionDto: UsdaSelectionDto): UsdaSelection {
        return new UsdaSelection(
            usdaSelectionDto.usda_selection_id,
            usdaSelectionDto.ndb_no,
            usdaSelectionDto.weight_id,
            usdaSelectionDto.servings,
        );
    }

    public static toUsdaSelections(usdaSelectionDtos: UsdaSelectionDto[]): UsdaSelection[] {
        return usdaSelectionDtos.map(UsdaSelectionMapper.toUsdaSelection);
    }
}
