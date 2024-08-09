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

function processAction({
  tam,
  mutate: action,
}: {
  tam: TamUnit;
  mutate: (tam: TamUnit) => TamUnit;
}): TamUnit {
  if (tam.foodLevel <= 0) {
    // Tam is dead
    return tam;
  }
  let newTam = { ...tam, age: tam.age + 1 };
  return action(newTam);
}

export function idleTam(tam: TamUnit): TamUnit {
  return processAction({
    tam,
    mutate: (tam) => {
      const newFoodLevel = tam.foodLevel - 1;
      tam.foodLevel = newFoodLevel < 0 ? 0 : newFoodLevel;
      return tam;
    },
  });
}

export function feedTam(tam: TamUnit): TamUnit {
  return processAction({
    tam,
    mutate: (tam) => {
      const newFoodLevel = tam.foodLevel + 10;
      tam.foodLevel = newFoodLevel > foodLevelMax ? foodLevelMax : newFoodLevel;
      return tam;
    },
  });
}
