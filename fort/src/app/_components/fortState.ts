const tileColumnCount = 3;
const tileRowCount = 3;

export const initialFortState = {
    time: 0,
    tileColsCount: tileColumnCount,
    tileRowsCount: tileRowCount,
    tiles: Array.from({ length: tileColumnCount * tileRowCount }, () => { return { color: 'red' }} ) as Tile[],
}

type tileColor = 'red' | 'blue' | 'green';

interface Tile {
    color: tileColor;
}
