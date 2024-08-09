export type TamUnit = {
    id: string;
    age: number;
};

export function createTam(): TamUnit {
    return {
        id: '1',
        age: 0,
    };
}
