import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {Food, FoodMapper} from './Food';
import {FoodDao} from './FoodDao';

export interface FoodService {
    getFoods(): Promise<Food[]>;
    getFood(id: string): Promise<Food>;
    searchFoods(query: string): Promise<Food[]>;
}

@injectable()
export class FoodServiceImpl implements FoodService {
    @inject(TYPES.FoodDao)
    private foodDao: FoodDao;

    public async getFoods(): Promise<Food[]> {
        return await this.foodDao
            .findAll()
            .then(FoodMapper.toFoods);
    }

    public async getFood(id: string): Promise<Food> {
        return await this.foodDao
            .find(id)
            .then(FoodMapper.toFood);
    }

    public async searchFoods(query: string): Promise<Food[]> {
        return await this.foodDao
            .search(query)
            .then(FoodMapper.toFoods);
    }
}
