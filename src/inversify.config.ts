import {Container} from 'inversify';
import TYPES from './types';
import 'reflect-metadata';
import {AddressService, AddressServiceImpl} from './service/AddressService';
import {AddressRepository, AddressRepositoryImplDb} from './repository/AddressRepository';
import {AddressController} from './controller/AddressController';
import {DailyValueService, DailyValueServiceImpl} from './service/DailyValueService';
import {DailyValueRepository, DailyValueRepositoryImplDb} from './repository/DailyValueRepository';
import {DailyValueController} from './controller/DailyValueController';
import {RegistrableController} from './controller/RegisterableController';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(AddressController);
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepositoryImplDb);
container.bind<RegistrableController>(TYPES.Controller).to(DailyValueController);
container.bind<DailyValueService>(TYPES.DailyValueService).to(DailyValueServiceImpl);
container.bind<DailyValueRepository>(TYPES.DailyValueRepository).to(DailyValueRepositoryImplDb);

export default container;
