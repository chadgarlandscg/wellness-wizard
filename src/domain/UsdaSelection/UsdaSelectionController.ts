import * as express from 'express';
import {controller, httpGet, requestParam, interfaces, httpPost} from 'inversify-express-utils';
import {inject} from 'inversify';
import TYPES from '../../container/types';
import {UsdaSelectionService} from './UsdaSelectionService';
// tslint:disable:no-unused-variable

@controller('/usdaSelection')
export class UsdaSelectionController implements interfaces.Controller {
    @inject(TYPES.UsdaSelectionService)
    private usdaSelectionService: UsdaSelectionService;

    @httpPost('/')
    private async create(req: express.Request, res: express.Response, next: express.NextFunction) {
        return await this.usdaSelectionService.createUsdaSelection(req.body);
    }
    @httpGet('/')
    private async findAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        return await this.usdaSelectionService.getUsdaSelections().catch(err => next(err));
    }
    @httpGet('/:id')
    private async findOne(@requestParam('id') id: string, res: express.Response, next: express.NextFunction) {
        return await this.usdaSelectionService.getUsdaSelection(id).catch(err => next(err));
    }
    @httpGet('/search/:query')
    private async search(@requestParam('query') query: string, res: express.Response, next: express.NextFunction) {
        return await this.usdaSelectionService.searchUsdaSelections(query);
    }
}
