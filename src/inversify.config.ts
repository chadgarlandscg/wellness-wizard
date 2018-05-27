import {Container, AsyncContainerModule} from 'inversify';
import TYPES from './types';
import 'reflect-metadata';
import {logger} from './util/Logger';
import {DailyValueService, DailyValueServiceImpl} from './service/DailyValueService';
import {DailyValueDao, DailyValueDaoImpl} from './dao/DailyValueDao';
import {DailyValueController} from './controller/DailyValueController';
import {RegistrableController} from './controller/RegisterableController';
import { createConnection, getConnection, ConnectionOptions, Repository } from 'typeorm';
import { DailyValueSchema } from './model/DailyValueSchema';

export const getContainer = async () => {
const container = new Container();
await container.loadAsync(dbBinding);
container.bind<RegistrableController>(TYPES.Controller).to(DailyValueController);
container.bind<DailyValueService>(TYPES.DailyValueService).to(DailyValueServiceImpl);
container.bind<DailyValueDao>(TYPES.DailyValueDao).to(DailyValueDaoImpl);

return container;
};

const dbBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    bind<Repository<DailyValueSchema>>(TYPES.DailyValueRepository).toDynamicValue(() => {
        return getDailyValueRepository();
    }).inRequestScope();
});
const getDailyValueRepository = () => {
    const conn = getConnection();
    const dailyValueRepository = conn.getRepository(DailyValueSchema);
    return dailyValueRepository;
};
const getDbConnection = async () => {
    return await createConnection(<ConnectionOptions> {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'chadgarland',
            database: 'wellness_wizard',
            logging: true,
            synchronize: false,
            entities: [
                DailyValueSchema
            ]
    }).catch(err => logger.error('Cannot connect to database', err));
};
