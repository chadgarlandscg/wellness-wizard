import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {DailyValueService} from '../service/DailyValueService';
import {RegistrableController} from './RegisterableController';

@injectable()
export class DailyValueController implements RegistrableController {
    private dailyValueService: DailyValueService;

    constructor(@inject(TYPES.DailyValueService) DailyValueService: DailyValueService) {
        this.dailyValueService = DailyValueService;
    }

    public register(app: express.Application): void {
        app.route('/dailyValue')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const dailyValue = await this.dailyValueService.getDailyValues().catch(err => next(err));
                res.json(dailyValue);
            });
        app.route('/dailyValue/:id')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const dailyValue = await this.dailyValueService.getDailyValue(<string> req.params.id).catch(err => next(err));
                res.json(dailyValue);
            });
    }
}
