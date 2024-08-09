export type TamUnit = {
    id: string;
    age: number;
};

export function createTam({ id }: { id: string}): TamUnit {
    return {
        id: id,
        age: 0,
    };
}
