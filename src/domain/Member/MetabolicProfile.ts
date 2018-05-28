import {Member} from './Member';
import Constants from './constants';

interface MetabolicProfile {
  memberId: number;
  weightData: any;
  basalMetabolicRate: number;
  zeroedMetabolicRate: number;
  targetMetabolicRate: number;
  burnTarget: number;
  hydrationTarget: number;
  recommendedWeightChange: number;
  myDailyValues?: any;
}

class MetabolicProfile implements MetabolicProfile {
  constructor(member: Member) {
    if (member) {
      this.init(member);
    }
  }

  public setMyDailyValues(dailyValues) {
    this.myDailyValues = calculateMyDailyValues(dailyValues, this.basalMetabolicRate);
  }
  private init(member: Member) {
    this.weightData = calculateWeightData(member.weight, member.height, member.metric, member.gender);
    this.basalMetabolicRate = calculateBasalMetabolicRate(this.weightData.min, member.height, member.birthDate, member.gender, member.metric);
    this.zeroedMetabolicRate = calculateZeroedMetabolicRate(this.basalMetabolicRate, member.activityLevel);
    this.targetMetabolicRate = calculateTargetMetabolicRate(this.zeroedMetabolicRate, member.targetWeightChange);
    this.burnTarget = calculateBurnTarget(this.basalMetabolicRate, this.zeroedMetabolicRate);
    this.hydrationTarget = calculateHydrationTarget(this.basalMetabolicRate, member.weight, member.metric);
    this.recommendedWeightChange = calculateRecommendedWeightChange(this.weightData.bmi);
    this.memberId = member.memberId;
  }
}

export default MetabolicProfile;

const calculateBasalMetabolicRate = (minWeight, height, birthDate, gender, metric) => {

  const weight = minWeight / (metric ? 1 : Constants.LBS_PER_KG);
  height = height / (metric ? 1 : Constants.INCHES_PER_CM);
  const age = Math.abs(new Date((+new Date() - +new Date(birthDate))).getUTCFullYear() - 1970);
  const weightCals = 10 * weight;
  const heightCals = 6.25 * height;
  const ageCals = 5 * age;
  const genderCals = (gender < 50 ? 5 : -161);
  return Math.round(weightCals + heightCals - ageCals + genderCals);
    // + 5-(166*gender/100) // implements gender slider math

    // Mifflin - St Jeor equation:
    //
    // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5         (man)
    // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161     (woman)
};
const calculateZeroedMetabolicRate = (basalMetabolicRate, activityLevel) => Math.round(basalMetabolicRate * activityLevel);
const calculateTargetMetabolicRate = (zeroedMetabolicRate, targetWeightChange) =>
  Math.round(zeroedMetabolicRate + (targetWeightChange * Constants.CALORIES_PER_LB));
const calculateBurnTarget = (basalMetabolicRate, zeroedMetabolicRate) => {
  return zeroedMetabolicRate - basalMetabolicRate;
};
const calculateHydrationTarget = (basalMetabolicRate, weight, metric) => {
  const calorieBasedTarget = 0.034 * basalMetabolicRate;
  const weightBasedTarget = 0.67 * weight * (metric ? Constants.LBS_PER_KG : 1);
  const average = (calorieBasedTarget + weightBasedTarget) / 2;
  return Math.round(average);
};
const calculateWeightData = (weight, height, metric, gender) => {
  // const weightInKg = weight / (metric ? 1 : Constants.LBS_PER_KG);
  const fiveFeetInInches = 60;
  const whoMinBmi = 18;
  const whoMaxBmi = 25;
  const heightInInches = height * (metric ? Constants.INCHES_PER_CM : 1);
  const inchesOverFiveFeet = heightInInches > fiveFeetInInches ? heightInInches - fiveFeetInInches : 0;
  const whoBmi = metric ? weight / ((height / 100) * (height / 100)) : 703 * weight / (height * height);
  const weightData = {
    robinson: (metric ? 1 : Constants.LBS_PER_KG) * (gender < 50 ? (52 + 1.9 * inchesOverFiveFeet) : (49 + 1.7 * inchesOverFiveFeet)),
    miller: (metric ? 1 : Constants.LBS_PER_KG) * (gender < 50 ? (56.2 + 1.41 * inchesOverFiveFeet) : (53.1 + 1.36 * inchesOverFiveFeet)),
    hamwi: (metric ? 1 : Constants.LBS_PER_KG) * (gender < 50 ? (48 + 2.7 * inchesOverFiveFeet) : (45.5 + 2.2 * inchesOverFiveFeet)),
    devine: (metric ? 1 : Constants.LBS_PER_KG) * (gender < 50 ? (50 + 2.3 * inchesOverFiveFeet) : (45.5 + 2.3 * inchesOverFiveFeet)),
    whoMinWeight: metric ? whoMinBmi * ((height / 100) * (height / 100)) : whoMinBmi * height * height / 703,
    whoMaxWeight: metric ? whoMaxBmi * ((height / 100) * (height / 100)) : whoMaxBmi * height * height / 703,
  };

  let sum = 0;
  const keys = Object.keys(weightData);
  keys.forEach(key => sum += weightData[key]);
  const average = Math.round(sum / keys.length);
  return {
    min: weightData.whoMinWeight,
    max: weightData.whoMaxWeight,
    lean: average,
    typical: average * (gender < 50 ? 1.15 : 1.2),
    bmi: whoBmi,
  };

  // J. D. Robinson Formula (1983)
  //
  // 52 kg + 1.9 kg per inch over 5 feet       (man)
  // 49 kg + 1.7 kg per inch over 5 feet       (woman)
  // D. R. Miller Formula (1983)
  //
  // 56.2 kg + 1.41 kg per inch over 5 feet       (man)
  // 53.1 kg + 1.36 kg per inch over 5 feet       (woman)
  // G. J. Hamwi Formula (1964)
  //
  // 48.0 kg + 2.7 kg per inch over 5 feet       (man)
  // 45.5 kg + 2.2 kg per inch over 5 feet       (woman)
  // B. J. Devine Formula (1974)
  //
  // 50.0 + 2.3 kg per inch over 5 feet       (man)
  // 45.5 + 2.3 kg per inch over 5 feet       (woman)
  // The World Health Organization (WHO) Recommended Healthy BMI Range
  // 18.5 - 25
};

const calculateMyDailyValues = (dailyValues, basalMetabolicRate) => dailyValues.map(dv => {
  dv.value *= basalMetabolicRate / 2000;
  return dv;
});

// const commonTagnames = {
//   PROCNT: 'PROTEIN',
//   FAT: 'FAT',
//   CARBS: 'CHOCDF',
//   CALORIES: 'ENERC_KCAL',
//   ALCOHOL: 'ALC',
//   WATER: 'WATER',
//   CAFFEINE: 'CAFFN',
// };

// 203     | g     | PROCNT     | Protein                            | 2       |      600
// 204     | g     | FAT        | Total lipid (fat)                  | 2       |      800
// 205     | g     | CHOCDF     | Carbohydrate, by difference        | 2       |     1100
// 208     | kcal  | ENERC_KCAL | Energy                             | 0       |      300
// 221     | g     | ALC        | Alcohol, ethyl                     | 1       |    18200
// 255     | g     | WATER      | Water                              | 2       |      100
// 262     | mg    | CAFFN      | Caffeine

const calculateRecommendedWeightChange = bmi => {
  if (bmi <= 16) { // Severe thinness
    return 2;
  } else if (bmi < 18.5 && bmi > 16) { // Thinness
    return 1;
  } else if (bmi > 23 && bmi <= 25) { // Heavier side of normal
    return -0.5;
  } else if (bmi > 25.00 && bmi < 30) { // Pre-obese
    return -1;
  } else if (bmi >= 30) { // Obese
    return -2;
  } else {
    return 0;
  }
};
