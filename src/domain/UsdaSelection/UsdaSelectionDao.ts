import {Repository} from 'typeorm';
import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {UsdaSelectionDto, UsdaSelectionSchema} from './UsdaSelectionSchema';

export interface UsdaSelectionDao {
    create(usdaSelection: UsdaSelectionDto): Promise<UsdaSelectionDto>;
    findAll(): Promise<UsdaSelectionDto[]>;
    find(id: string): Promise<UsdaSelectionDto>;
    search(query: string): Promise<UsdaSelectionDto[]>;
}

@injectable()
export class UsdaSelectionDaoImpl implements UsdaSelectionDao {
    @inject(TYPES.UsdaSelectionRepository)
    private readonly usdaSelectionRepository: Repository<UsdaSelectionSchema>;

    public async create(usdaSelection: UsdaSelectionDto): Promise<UsdaSelectionDto> {
        return await this.usdaSelectionRepository.save(usdaSelection);
    }
    public async findAll(): Promise<UsdaSelectionDto[]> {
        return await this.usdaSelectionRepository.find();
    }
    public async find(id: string): Promise<UsdaSelectionDto> {
        return await this.usdaSelectionRepository.findOne(id);
    }
    public async search(query: string): Promise<UsdaSelectionDto[]> {
        return await this.usdaSelectionRepository.find();
    }
}
