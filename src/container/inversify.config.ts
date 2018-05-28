import {Container} from 'inversify';
import {DailyValueService, DailyValueServiceImpl} from '../domain/DailyValue/DailyValueService';
import {DailyValueDao, DailyValueDaoImpl} from '../domain/DailyValue/DailyValueDao';
import {dbBinding} from './dbBinding';
import TYPES from './types';

import '../domain/Member/MemberController';
import '../domain/DailyValue/DailyValueController';
import '../domain/Food/FoodController';
import '../domain/MetabolicEvent/MetabolicEventController';
import { FoodService, FoodServiceImpl } from '../domain/Food/FoodService';
import { FoodDao, FoodDaoImpl } from '../domain/Food/FoodDao';
import { MemberService, MemberServiceImpl } from '../domain/Member/MemberService';
import { MemberDao, MemberDaoImpl } from '../domain/Member/MemberDao';
import { MetabolicEventService, MetabolicEventServiceImpl } from '../domain/MetabolicEvent/MetabolicEventService';
import { MetabolicEventDao, MetabolicEventDaoImpl} from '../domain/MetabolicEvent/MetabolicEventDao';

export const getContainer = async () => {
    const container = new Container();
    await container.loadAsync(dbBinding);
    container.bind<MemberService>(TYPES.MemberService).to(MemberServiceImpl);
    container.bind<MemberDao>(TYPES.MemberDao).to(MemberDaoImpl);
    container.bind<MetabolicEventService>(TYPES.MetabolicEventService).to(MetabolicEventServiceImpl);
    container.bind<MetabolicEventDao>(TYPES.MetabolicEventDao).to(MetabolicEventDaoImpl);
    container.bind<DailyValueService>(TYPES.DailyValueService).to(DailyValueServiceImpl);
    container.bind<DailyValueDao>(TYPES.DailyValueDao).to(DailyValueDaoImpl);
    container.bind<FoodService>(TYPES.FoodService).to(FoodServiceImpl);
    container.bind<FoodDao>(TYPES.FoodDao).to(FoodDaoImpl);
    return container;
};
