import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {MetabolicEvent, MetabolicEventMapper} from './MetabolicEvent';
import {MetabolicEventDao} from './MetabolicEventDao';

export interface MetabolicEventService {
    createMetabolicEvent(metabolicEvent: MetabolicEvent): Promise<MetabolicEvent>;
    getMetabolicEvent(id: string): Promise<MetabolicEvent>;
    searchMetabolicEvents(query: string): Promise<MetabolicEvent[]>;
}

@injectable()
export class MetabolicEventServiceImpl implements MetabolicEventService {
    @inject(TYPES.MetabolicEventDao)
    private metabolicEventDao: MetabolicEventDao;

    public async createMetabolicEvent(metabolicEvent: MetabolicEvent): Promise<MetabolicEvent> {
        const newMetabolicEventDto = await this.metabolicEventDao.create(MetabolicEventMapper.toMetabolicEventDto(metabolicEvent));
        const newMetabolicEvent = MetabolicEventMapper.toMetabolicEvent(newMetabolicEventDto);
        return newMetabolicEvent;
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
