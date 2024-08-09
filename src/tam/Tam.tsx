import { TamUnit } from './tam';

export default function Tam({ tam }: { tam: TamUnit }) {
    return (
        <div>
            <label>Id <div>{tam.id}</div></label>
            <label>Age <div>{tam.age}</div></label>
            <label>Food <div>{tam.foodLevel}</div></label>
        </div>
    );
}