import {Repository, Like} from 'typeorm';
import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {FoodDto, FoodSchema} from './FoodSchema';

export interface FoodDao {
    find(id: string): Promise<FoodDto>;
    search(query: string): Promise<FoodDto[]>;
}

@injectable()
export class FoodDaoImpl implements FoodDao {
    @inject(TYPES.FoodRepository)
    private readonly foodRepository: Repository<FoodSchema>;

    public async find(id: string): Promise<FoodDto> {
        return await this.foodRepository.findOne(id, {
            relations: ['foodNutritions', 'foodGroup', 'weights']
        });
    }
    public async search(query: string): Promise<FoodDto[]> {
        return await this.foodRepository.find({
            where: {
                long_desc: Like(`%${query}%`),
                // shrt_desc: Like(`%${query}%`),
                // comname: Like(`%${query}%`),
                // manufacname: Like(`%${query}%`),
            },
            take: 5,
            cache: true,
        });
    }
}
