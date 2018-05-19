import {injectable} from 'inversify';
import {DailyValueDto, DailyValueDbSchema} from '../model/DailyValueSchema';
import {logger} from '../util/Logger';
import {createConnection, Connection, Repository, ConnectionOptions} from 'typeorm';

export interface DailyValueRepository {
    findAll(): Promise<Array<DailyValueDto>>;
    find(id: string): Promise<DailyValueDto>;
}

@injectable()
export class DailyValueRepositoryImplDb implements DailyValueRepository {
    private dailyValueRepository: Repository<DailyValueDbSchema>;

    constructor() {
        this.connect().then(async connection => {
            this.dailyValueRepository = connection.getRepository(DailyValueDbSchema);
        }).catch(err => logger.error('Cannot connect to database', err));
    }

    public async findAll(): Promise<Array<DailyValueDto>> {
        return await this.dailyValueRepository.find();
    }

    public async find(id: string): Promise<DailyValueDto> {
        return await this.dailyValueRepository.findOne(id);
    }

    private connect(): Promise<Connection> {
        return createConnection(<ConnectionOptions> {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'chadgarland',
            database: 'wellness_wizard',
            logging: true,
            synchronize: false,
            entities: [
                DailyValueDbSchema
            ]
        });
    }
}
