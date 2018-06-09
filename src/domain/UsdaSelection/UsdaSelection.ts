import { UsdaSelectionDto } from './UsdaSelectionSchema';

export class UsdaSelection {
    public usdaSelectionId?: number;
    public ndbNo?: string;
    public weightId?: number;
    public servings?: number;
    constructor(
        usdaSelection: UsdaSelection = {} as UsdaSelection
    ) {
        let {
            usdaSelectionId,
            ndbNo,
            weightId,
            servings,
        } = usdaSelection;
        this.usdaSelectionId = usdaSelectionId;
        this.ndbNo = ndbNo;
        this.weightId = weightId;
        this.servings = servings;
    }
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
        return new UsdaSelection({
            usdaSelectionId: usdaSelectionDto.usda_selection_id,
            ndbNo: usdaSelectionDto.ndb_no,
            weightId: usdaSelectionDto.weight_id,
            servings: usdaSelectionDto.servings,
        });
    }

    public static toUsdaSelections(usdaSelectionDtos: UsdaSelectionDto[]): UsdaSelection[] {
        return usdaSelectionDtos.map(UsdaSelectionMapper.toUsdaSelection);
    }
}
