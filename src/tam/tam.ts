export type TamUnit = {
  id: string;
  age: number;
  foodLevel: number;
};

const foodLevelMax = 100;

export function createTam({ id }: { id: string }): TamUnit {
  return {
    id: id,
    age: 0,
    foodLevel: foodLevelMax,
  };
}

export function idleTam(tam: TamUnit): TamUnit {
  const newFoodLevel = tam.foodLevel - 1;
  return {
    ...tam,
    age: tam.age + 1,
    foodLevel: newFoodLevel < 0 ? 0 : newFoodLevel,
  };
}

export function feedTam(tam: TamUnit): TamUnit {
  const newFoodLevel = tam.foodLevel + 10;
  return {
    ...tam,
    foodLevel: newFoodLevel > foodLevelMax ? foodLevelMax : newFoodLevel,
  };
}
