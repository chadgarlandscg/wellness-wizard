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
import { MemberSchema } from '../domain/Member/MemberSchema';
import { MetabolicEventSchema } from '../domain/MetabolicEvent/MetabolicEventSchema';
import { UsdaSelectionSchema } from '../domain/UsdaSelection/UsdaSelectionSchema';
import { UsdaSelectionEventSchema } from '../domain/UsdaSelectionEvent/UsdaSelectionEventSchema';

import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

const entities = [
    MemberSchema,
    MetabolicEventSchema,
    UsdaSelectionSchema,
    UsdaSelectionEventSchema,
    DailyValueSchema,
    FoodSchema,
    FoodGroupSchema,
    FoodNutritionSchema,
    NutrientSchema,
    WeightSchema,
];
const getMemberRepository = () => getConnection().getRepository(MemberSchema);
const getMetabolicEventRepository = () => getConnection().getRepository(MetabolicEventSchema);
const getUsdaSelectionRepository = () => getConnection().getRepository(UsdaSelectionSchema);
const getUsdaSelectionEventRepository = () => getConnection().getRepository(UsdaSelectionEventSchema);
const getDailyValueRepository = () => getConnection().getRepository(DailyValueSchema);
const getFoodRepository = () => getConnection().getRepository(FoodSchema);
const getFoodGroupRepository = () => getConnection().getRepository(FoodGroupSchema);
const getFoodNutritionRepository = () => getConnection().getRepository(FoodNutritionSchema);
const getNutrientRepository = () => getConnection().getRepository(NutrientSchema);
const getWeightRepository = () => getConnection().getRepository(WeightSchema);

export const dbBinding = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    bind<Repository<MemberSchema>>(TYPES.MemberRepository).toDynamicValue(getMemberRepository).inRequestScope();
    bind<Repository<MetabolicEventSchema>>(TYPES.MetabolicEventRepository).toDynamicValue(getMetabolicEventRepository).inRequestScope();
    bind<Repository<UsdaSelectionSchema>>(TYPES.UsdaSelectionRepository).toDynamicValue(getUsdaSelectionRepository).inRequestScope();
    bind<Repository<UsdaSelectionEventSchema>>(TYPES.UsdaSelectionEventRepository).toDynamicValue(getUsdaSelectionEventRepository).inRequestScope();
    bind<Repository<DailyValueSchema>>(TYPES.DailyValueRepository).toDynamicValue(getDailyValueRepository).inRequestScope();
    bind<Repository<FoodSchema>>(TYPES.FoodRepository).toDynamicValue(getFoodRepository).inRequestScope();
    bind<Repository<FoodGroupSchema>>(TYPES.FoodGroupRepository).toDynamicValue(getFoodGroupRepository).inRequestScope();
    bind<Repository<FoodNutritionSchema>>(TYPES.FoodNutritionRepository).toDynamicValue(getFoodNutritionRepository).inRequestScope();
    bind<Repository<NutrientSchema>>(TYPES.NutrientRepository).toDynamicValue(getNutrientRepository).inRequestScope();
    bind<Repository<WeightSchema>>(TYPES.WeightRepository).toDynamicValue(getWeightRepository).inRequestScope();
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
            namingStrategy: new SnakeNamingStrategy(),
    }).catch(err => logger.error('Cannot connect to database', err));
};

class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }

  public columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.join('_')) + (customName ? customName : snakeCase(propertyName));
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  public joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  public joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string): string {
    return snakeCase(firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName);
  }

  public joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
  }

  public classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }

  public columnNameCustomized(customName: string): string {
    return customName;
  }

  public joinColumnInverseSideName(joinColumnName: string, propertyName: string): string {
    if (joinColumnName) { return joinColumnName; }

    return snakeCase(propertyName);
  }
}
