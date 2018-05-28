import { FoodGroupSchema } from '../FoodGroup/FoodGroupSchema';
import { WeightSchema } from '../Weight/WeightSchema';
import { FoodNutritionSchema } from '../FoodNutrition/FoodNutritionSchema';

export class Food {
    constructor(
        private ndbNo: string,
        private fdgrpCd: string,
        private longDesc: string,
        private shrtDesc: string,
        private comname: string,
        private manufacname: string,
        private survey: string,
        private refDesc: string,
        private refuse: number,
        private sciname: string,
        private nFactor: number,
        private proFactor: number,
        private fatFactor: number,
        private choFactor: number,
        private foodGroup: FoodGroupSchema,
        private weights: WeightSchema[],
        private foodNutritions: FoodNutritionSchema[],
    ) {}
    public get getNdbNo(){
        return this.ndbNo;
    }
    public get getFdgrpCd(){
        return this.fdgrpCd;
    }
    public get getLongDesc(){
        return this.longDesc;
    }
    public get getShrtDesc(){
        return this.shrtDesc;
    }
    public get getComname(){
        return this.comname;
    }
    public get getManufacname(){
        return this.manufacname;
    }
    public get getSurvey(){
        return this.survey;
    }
    public get getRefDesc(){
        return this.refDesc;
    }
    public get getRefuse(){
        return this.refuse;
    }
    public get getSciname(){
        return this.sciname;
    }
    public get getNFactor(){
        return this.nFactor;
    }
    public get getProFactor(){
        return this.proFactor;
    }
    public get getFatFactor(){
        return this.fatFactor;
    }
    public get getChoFactor(){
        return this.choFactor;
    }
    public get getFoodGroup(){
        return this.foodGroup;
    }
    public get getWeights(){
        return this.weights;
    }
    public get getFoodNutritions(){
        return this.foodNutritions;
    }
}
