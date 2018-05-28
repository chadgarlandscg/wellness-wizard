import * as express from 'express';
import {controller, httpGet, requestParam, interfaces, httpPost} from 'inversify-express-utils';
import {inject} from 'inversify';
import TYPES from '../../container/types';
import {MetabolicEventService} from './MetabolicEventService';
// tslint:disable:no-unused-variable

@controller('/metabolicEvent')
export class MetabolicEventController implements interfaces.Controller {
    @inject(TYPES.MetabolicEventService)
    private metabolicEventService: MetabolicEventService;

    @httpPost('/')
    private async create(req: express.Request, res: express.Response, next: express.NextFunction) {
        return await this.metabolicEventService.createMetabolicEvent(req.body);
    }
    @httpGet('/')
    private async findAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        return await this.metabolicEventService.getMetabolicEvents().catch(err => next(err));
    }
    @httpGet('/:id')
    private async findOne(@requestParam('id') id: string, res: express.Response, next: express.NextFunction) {
        return await this.metabolicEventService.getMetabolicEvent(id).catch(err => next(err));
    }
    @httpGet('/search/:query')
    private async search(@requestParam('query') query: string, res: express.Response, next: express.NextFunction) {
        return await this.metabolicEventService.searchMetabolicEvents(query);
    }
}
