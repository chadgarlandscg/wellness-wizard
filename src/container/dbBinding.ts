import {AsyncContainerModule} from 'inversify';
import {createConnection, getConnection, ConnectionOptions, Repository} from 'typeorm';
import {DailyValueSchema} from '../domain/DailyValue/DailyValueSchema';
import TYPES from './types';
import {logger} from '../util/Logger';
import { FoodSchema } from '../domain/Food/FoodSchema';
import { FoodGroupSchema } from '../domain/FoodGroup/FoodGroupSchema';
import { FoodNutritionSchema } from '../domain/FoodNutrition/FoodNutritionSchema';
import { NutrientSchema } from '../domain/Nutrient/NutrientSchema';
import { WeightSchema } from '../domain/Weight/WeightSchema';

const entities = [
    DailyValueSchema,
    FoodSchema,
    FoodGroupSchema,
    FoodNutritionSchema,
    NutrientSchema,
    WeightSchema,
];
const getDailyValueRepository = () => getConnection().getRepository(DailyValueSchema);
const getFood = () => getConnection().getRepository(FoodSchema);
const getFoodGroup = () => getConnection().getRepository(FoodGroupSchema);
const getFoodNutrition = () => getConnection().getRepository(FoodNutritionSchema);
const getNutrient = () => getConnection().getRepository(NutrientSchema);
const getWeight = () => getConnection().getRepository(WeightSchema);

export const dbBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    bind<Repository<DailyValueSchema>>(TYPES.DailyValueRepository).toDynamicValue(getDailyValueRepository).inRequestScope();
    bind<Repository<FoodSchema>>(TYPES.FoodRepository).toDynamicValue(getFood).inRequestScope();
    bind<Repository<FoodGroupSchema>>(TYPES.FoodGroupRepository).toDynamicValue(getFoodGroup).inRequestScope();
    bind<Repository<FoodNutritionSchema>>(TYPES.FoodNutritionRepository).toDynamicValue(getFoodNutrition).inRequestScope();
    bind<Repository<NutrientSchema>>(TYPES.NutrientRepository).toDynamicValue(getNutrient).inRequestScope();
    bind<Repository<WeightSchema>>(TYPES.WeightRepository).toDynamicValue(getWeight).inRequestScope();
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
