const TYPES = {
    MemberService: Symbol('MemberService'),
    MemberDao: Symbol('MemberDao'),
    MemberRepository: Symbol('MemberRepository'),

    MetabolicEventService: Symbol('MetabolicEventService'),
    MetabolicEventDao: Symbol('MetabolicEventDao'),
    MetabolicEventRepository: Symbol('MetabolicEventRepository'),

    DailyValueService: Symbol('DailyValueService'),
    DailyValueDao: Symbol('DailyValueDao'),
    DailyValueRepository: Symbol('DailyValueRepository'),

    FoodService: Symbol('FoodService'),
    FoodDao: Symbol('Food'),
    FoodRepository: Symbol('FoodRepository'),

    FoodGroupService: Symbol('FoodGroupService'),
    FoodGroupDao: Symbol('FoodGroup'),
    FoodGroupRepository: Symbol('FoodGroupRepository'),

    FoodNutritionService: Symbol('FoodNutritionService'),
    FoodNutritionDao: Symbol('FoodNutrition'),
    FoodNutritionRepository: Symbol('FoodNutritionRepository'),

    NutrientService: Symbol('NutrientService'),
    NutrientDao: Symbol('Nutrient'),
    NutrientRepository: Symbol('NutrientRepository'),

    WeightService: Symbol('WeightService'),
    WeightDao: Symbol('Weight'),
    WeightRepository: Symbol('WeightRepository'),
};

export default TYPES;
