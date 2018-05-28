import {injectable, inject} from 'inversify';
import TYPES from '../../container/types';
import {MetabolicEvent, MetabolicEventMapper} from './MetabolicEvent';
import {MetabolicEventDao} from './MetabolicEventDao';
import {MetabolicEventDto} from './MetabolicEventSchema';

export interface MetabolicEventService {
    createMetabolicEvent(metabolicEvent: MetabolicEvent): Promise<MetabolicEvent>;
    getMetabolicEvents(): Promise<Array<MetabolicEvent>>;
    getMetabolicEvent(id: string): Promise<MetabolicEvent>;
    searchMetabolicEvents(query: string): Promise<MetabolicEvent[]>;
}

@injectable()
export class MetabolicEventServiceImpl implements MetabolicEventService {
    @inject(TYPES.MetabolicEventDao)
    private metabolicEventDao: MetabolicEventDao;

    constructor() {
        MetabolicEventMapper.toMetabolicEventDto = MetabolicEventMapper.toMetabolicEventDto.bind(this);
        MetabolicEventMapper.toMetabolicEvent = MetabolicEventMapper.toMetabolicEvent.bind(this);
        MetabolicEventMapper.toMetabolicEvents = MetabolicEventMapper.toMetabolicEvents.bind(this);
    }

    public async createMetabolicEvent(metabolicEvent: MetabolicEvent): Promise<MetabolicEvent> {
        const newMetabolicEventDto = await this.metabolicEventDao.create(MetabolicEventMapper.toMetabolicEventDto(metabolicEvent));
        const newMetabolicEvent = MetabolicEventMapper.toMetabolicEvent(newMetabolicEventDto);
        return newMetabolicEvent;
    }

    public async getMetabolicEvents(): Promise<Array<MetabolicEvent>> {
        return await this.metabolicEventDao.findAll().then(
            dtos => dtos.map(
                (dto: MetabolicEventDto) => MetabolicEventMapper.toMetabolicEvent(dto)
            )
        );
    }

    public async getMetabolicEvent(id: string): Promise<MetabolicEvent> {
        return await this.metabolicEventDao.find(id).then(
            dto => MetabolicEventMapper.toMetabolicEvent(dto)
        );
    }

    public async searchMetabolicEvents(query: string): Promise<MetabolicEvent[]> {
        return await this.metabolicEventDao.search(query).then(MetabolicEventMapper.toMetabolicEvents);
    }

}
