import {Container, AsyncContainerModule} from 'inversify';
import TYPES from './types';
import 'reflect-metadata';
// import {AddressService, AddressServiceImpl} from './service/AddressService';
// import {AddressRepository, AddressRepositoryImplDb} from './repository/AddressRepository';
// import {AddressController} from './controller/AddressController';
import {DailyValueService, DailyValueServiceImpl} from './service/DailyValueService';
import {DailyValueDao, DailyValueDaoImpl} from './repository/DailyValueDao';
import {DailyValueController} from './controller/DailyValueController';
import {RegistrableController} from './controller/RegisterableController';
import { createConnection, getConnection, ConnectionOptions, Repository } from 'typeorm';
import { DailyValueDbSchema } from './model/DailyValueSchema';

export const getContainer = async () => {
const container = new Container();
await container.loadAsync(dbBinding);
// container.bind<RegistrableController>(TYPES.Controller).to(AddressController);
// container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
// container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepositoryImplDb);
container.bind<RegistrableController>(TYPES.Controller).to(DailyValueController);
container.bind<DailyValueService>(TYPES.DailyValueService).to(DailyValueServiceImpl);
container.bind<DailyValueDao>(TYPES.DailyValueDao).to(DailyValueDaoImpl);

return container;
};

const dbBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    bind<Repository<DailyValueDbSchema>>(TYPES.DailyValueRepository).toDynamicValue(() => {
        return getDailyValueRepository();
    }).inRequestScope();
});
const getDailyValueRepository = () => {
    const conn = getConnection();
    const dailyValueRepository = conn.getRepository(DailyValueDbSchema);
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
                DailyValueDbSchema
            ]
    });
};
