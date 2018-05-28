import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {Food} from './Food';
import {FoodDao} from './FoodDao';
import {FoodDto} from './FoodSchema';

export interface FoodService {
    getFoods(): Promise<Array<Food>>;
    getFood(id: string): Promise<Food>;
    searchFoods(query: string): Promise<Food[]>;
}

@injectable()
export class FoodServiceImpl implements FoodService {
    @inject(TYPES.FoodDao)
    private foodDao: FoodDao;

    constructor() {
        this.toFood = this.toFood.bind(this);
        this.toFoods = this.toFoods.bind(this);
    }

    public async getFoods(): Promise<Array<Food>> {
        return await this.foodDao.findAll().then(
            dtos => dtos.map(
                (dto: FoodDto) => this.toFood(dto)
            )
        );
    }

    public async getFood(id: string): Promise<Food> {
        return await this.foodDao.find(id).then(
            dto => this.toFood(dto)
        );
    }

    public async searchFoods(query: string): Promise<Food[]> {
        return await this.foodDao.search(query).then(this.toFoods);
    }

    private toFood(foodDto: FoodDto): Food {
        return new Food(
            foodDto.ndb_no,
            foodDto.fdgrp_cd,
            foodDto.long_desc,
            foodDto.shrt_desc,
            foodDto.comname,
            foodDto.manufacname,
            foodDto.survey,
            foodDto.ref_desc,
            foodDto.refuse,
            foodDto.sciname,
            foodDto.n_factor,
            foodDto.pro_factor,
            foodDto.fat_factor,
            foodDto.cho_factor,
            foodDto.foodGroup,
            foodDto.weights,
            foodDto.foodNutritions,
        );
    }

    private toFoods(foodDtos: FoodDto[]): Food[] {
        return foodDtos.map(this.toFood);
    }
}
