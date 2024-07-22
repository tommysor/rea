'use client';

import { useState } from "react";
import { initialFortState } from "./fortState";

export default function FortBoard() {
    const [state, setState] = useState(initialFortState);

    const gridClassName = `grid grid-cols-${state.tileColsCount} gap-1`;

    return (
        <div>
            <div>Time: {state.time}</div>
            <div>Here be dragons</div>
            <div className={gridClassName}>
                {Array.from({ length: state.tileColsCount * state.tileRowsCount }).map((_, index) => (
                    <div key={index} className="flex">{index}</div>
                ))}
            </div>
        </div>
    );
}
