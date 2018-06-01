import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {UsdaSelection, UsdaSelectionMapper} from './UsdaSelection';
import {UsdaSelectionDao} from './UsdaSelectionDao';

export interface UsdaSelectionService {
    createUsdaSelection(usdaSelection: UsdaSelection): Promise<UsdaSelection>;
    getUsdaSelections(): Promise<UsdaSelection[]>;
    getUsdaSelection(id: string): Promise<UsdaSelection>;
    searchUsdaSelections(query: string): Promise<UsdaSelection[]>;
}

@injectable()
export class UsdaSelectionServiceImpl implements UsdaSelectionService {
    @inject(TYPES.UsdaSelectionDao)
    private usdaSelectionDao: UsdaSelectionDao;

    public async createUsdaSelection(usdaSelection: UsdaSelection): Promise<UsdaSelection> {
        return await this.usdaSelectionDao
            .create(UsdaSelectionMapper.toUsdaSelectionDto(usdaSelection))
            .then(UsdaSelectionMapper.toUsdaSelection);
    }
    public async getUsdaSelections(): Promise<UsdaSelection[]> {
        return await this.usdaSelectionDao
            .findAll()
            .then(UsdaSelectionMapper.toUsdaSelections);
    }

    public async getUsdaSelection(id: string): Promise<UsdaSelection> {
        return await this.usdaSelectionDao
            .find(id)
            .then(UsdaSelectionMapper.toUsdaSelection);
    }

    public async searchUsdaSelections(query: string): Promise<UsdaSelection[]> {
        return await this.usdaSelectionDao
            .search(query)
            .then(UsdaSelectionMapper.toUsdaSelections);
    }
}
