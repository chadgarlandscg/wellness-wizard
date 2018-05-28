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
const getFoodSchema = () => getConnection().getRepository(FoodSchema);
const getFoodGroupSchema = () => getConnection().getRepository(FoodGroupSchema);
const getFoodNutritionSchema = () => getConnection().getRepository(FoodNutritionSchema);
const getNutrientSchema = () => getConnection().getRepository(NutrientSchema);
const getWeightSchema = () => getConnection().getRepository(WeightSchema);

export const dbBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    bind<Repository<DailyValueSchema>>(TYPES.DailyValueRepository).toDynamicValue(getDailyValueRepository).inRequestScope();
    bind<Repository<FoodSchema>>(TYPES.FoodSchemaRepository).toDynamicValue(getFoodSchema).inRequestScope();
    bind<Repository<FoodGroupSchema>>(TYPES.FoodGroupSchemaRepository).toDynamicValue(getFoodGroupSchema).inRequestScope();
    bind<Repository<FoodNutritionSchema>>(TYPES.FoodNutritionSchemaRepository).toDynamicValue(getFoodNutritionSchema).inRequestScope();
    bind<Repository<NutrientSchema>>(TYPES.NutrientSchemaRepository).toDynamicValue(getNutrientSchema).inRequestScope();
    bind<Repository<WeightSchema>>(TYPES.WeightSchemaRepository).toDynamicValue(getWeightSchema).inRequestScope();
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
