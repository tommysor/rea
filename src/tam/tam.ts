export type TamUnit = {
    id: string;
    age: number;
    foodLevel: number;
};

const foodLevelMax = 100;

export function createTam({ id }: { id: string}): TamUnit {
    return {
        id: id,
        age: 0,
        foodLevel: foodLevelMax,
    };
}
