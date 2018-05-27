import {Container} from 'inversify';
import 'reflect-metadata';
import {DailyValueService, DailyValueServiceImpl} from '../service/DailyValueService';
import {DailyValueDao, DailyValueDaoImpl} from '../dao/DailyValueDao';
import {dbBinding} from './dbBinding';
import TYPES from './types';

import '../controller/DailyValueController';

export const getContainer = async () => {
    const container = new Container();
    await container.loadAsync(dbBinding);
    container.bind<DailyValueService>(TYPES.DailyValueService).to(DailyValueServiceImpl);
    container.bind<DailyValueDao>(TYPES.DailyValueDao).to(DailyValueDaoImpl);
    return container;
};
