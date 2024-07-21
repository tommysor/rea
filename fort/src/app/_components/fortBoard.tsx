'use client';

import { useState } from "react";
import { initialFortState } from "./fortState";

export default function FortBoard() {
    const [state, setState] = useState(initialFortState);

    return (
        <div>
            <div>Time: {state.time}</div>
            <div>Here be dragons</div>
            <div className={'grid ' + 'grid-cols-' + state.tileColsCount + ' gap-1'}>
                {state.tiles.map((tile, index) => (
                    <div key={index} style={{ backgroundColor: tile.color, width: '100px', height: '100px' }}></div>
                ))}
            </div>
        </div>
    );
}
