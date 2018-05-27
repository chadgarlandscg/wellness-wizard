import {AsyncContainerModule} from 'inversify';
import {createConnection, getConnection, ConnectionOptions, Repository} from 'typeorm';
import {DailyValueSchema} from '../domain/DailyValue/DailyValueSchema';
import TYPES from './types';
import {logger} from '../util/Logger';

const entities = [
    DailyValueSchema,
];
const getDailyValueRepository = () => getConnection().getRepository(DailyValueSchema);

export const dbBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    bind<Repository<DailyValueSchema>>(TYPES.DailyValueRepository).toDynamicValue(getDailyValueRepository).inRequestScope();
});

const getDbConnection = async () => {
    return await createConnection(<ConnectionOptions> {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'chadgarland',
            database: 'wellness_wizard',
            logging: true,
            synchronize: false,
            entities: entities,
    }).catch(err => logger.error('Cannot connect to database', err));
};
