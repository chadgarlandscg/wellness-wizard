import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {MetabolicEvent, MetabolicEventMapper} from './MetabolicEvent';
import {MetabolicEventDao} from './MetabolicEventDao';
import { UsdaSelectionService } from '../UsdaSelection/UsdaSelectionService';
import { UsdaSelectionEvent } from '../UsdaSelectionEvent/UsdaSelectionEvent';

export interface MetabolicEventService {
    createMetabolicEvent(metabolicEvent: MetabolicEvent): Promise<MetabolicEvent>;
    getMetabolicEvents(): Promise<MetabolicEvent[]>;
    getMetabolicEvent(id: string): Promise<MetabolicEvent>;
    searchMetabolicEvents(query: string): Promise<MetabolicEvent[]>;
}

@injectable()
export class MetabolicEventServiceImpl implements MetabolicEventService {
    @inject(TYPES.MetabolicEventDao)
    private metabolicEventDao: MetabolicEventDao;
    @inject(TYPES.UsdaSelectionService)
    private usdaSelectionService: UsdaSelectionService;

    public async createMetabolicEvent(metabolicEvent: MetabolicEvent): Promise<MetabolicEvent> {
        const usdaSelection = await this.usdaSelectionService.createUsdaSelection(metabolicEvent.usdaSelections[0]);
        const usdaSelectionEvent = new UsdaSelectionEvent(null, usdaSelection.usdaSelectionId);
        metabolicEvent.usdaSelectionEvents = [usdaSelectionEvent];
        const newMetabolicEventDto = await this.metabolicEventDao.create(MetabolicEventMapper.toMetabolicEventDto(metabolicEvent));
        const newMetabolicEvent = MetabolicEventMapper.toMetabolicEvent(newMetabolicEventDto);
        return newMetabolicEvent;
    }

    public async getMetabolicEvents(): Promise<MetabolicEvent[]> {
        return await this.metabolicEventDao
            .findAll()
            .then(MetabolicEventMapper.toMetabolicEvents);
    }

    public async getMetabolicEvent(id: string): Promise<MetabolicEvent> {
        return await this.metabolicEventDao
            .find(id)
            .then(MetabolicEventMapper.toMetabolicEvent);
    }

    public async searchMetabolicEvents(query: string): Promise<MetabolicEvent[]> {
        return await this.metabolicEventDao
            .search(query)
            .then(MetabolicEventMapper.toMetabolicEvents);
    }

}
