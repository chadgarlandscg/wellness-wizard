import * as express from 'express';
import {controller, httpGet, queryParam, interfaces} from 'inversify-express-utils';
import {inject} from 'inversify';
import TYPES from '../../container/types';
import {DailyValueService} from './DailyValueService';
// tslint:disable:no-unused-variable

@controller('/dailyValue')
export class DailyValueController implements interfaces.Controller {
    @inject(TYPES.DailyValueService)
    private dailyValueService: DailyValueService;

    @httpGet('/')
    private async findAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        return await this.dailyValueService.getDailyValues().catch(err => next(err));
    }
    @httpGet('/:id')
    private async findOne(@queryParam('id') id: string, next: express.NextFunction) {
        return await this.dailyValueService.getDailyValue(id).catch(err => next(err));
    }
}
