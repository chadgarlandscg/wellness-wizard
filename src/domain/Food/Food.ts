import { FoodGroupDto } from '../FoodGroup/FoodGroupSchema';
import { WeightDto } from '../Weight/WeightSchema';
import { FoodNutritionDto } from '../FoodNutrition/FoodNutritionSchema';
import { FoodDto } from './FoodSchema';

export class Food {
    constructor(
        public ndbNo: string,
        public fdgrpCd: string,
        public longDesc: string,
        public shrtDesc: string,
        public comname: string,
        public manufacname: string,
        public survey: string,
        public refDesc: string,
        public refuse: number,
        public sciname: string,
        public nFactor: number,
        public proFactor: number,
        public fatFactor: number,
        public choFactor: number,
        public foodGroup: FoodGroupDto,
        public weights: WeightDto[],
        public foodNutritions: FoodNutritionDto[],
    ) {}
}

export class FoodMapper {
    public static toFood(foodDto: FoodDto): Food {
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

    public static toFoods(foodDtos: FoodDto[]): Food[] {
        return foodDtos.map(FoodMapper.toFood);
    }
}
