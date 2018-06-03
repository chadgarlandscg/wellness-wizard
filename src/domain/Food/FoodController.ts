import * as express from 'express';
import {controller, httpGet, requestParam, interfaces} from 'inversify-express-utils';
import {inject} from 'inversify';
import TYPES from '../../container/types';
import {FoodService} from './FoodService';
// tslint:disable:no-unused-variable

@controller('/food')
export class FoodController implements interfaces.Controller {
    @inject(TYPES.FoodService)
    private foodService: FoodService;

    @httpGet('/:id')
    private async findOne(@requestParam('id') id: string, res: express.Response, next: express.NextFunction) {
        return await this.foodService.getFood(id).catch(err => next(err));
    }
    @httpGet('/search/:query')
    private async search(@requestParam('query') query: string, res: express.Response, next: express.NextFunction) {
        return await this.foodService.searchFoods(query);
    }
}
