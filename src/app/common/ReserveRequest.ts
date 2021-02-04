import { leadingComment } from '@angular/compiler';
import { Lendable } from './Lendable';
import { LendableGroup } from './LendableGroup';

export class ReserveRequest {
    constructor(public name: string, public lendables: LendableGroup[]) { }
    static build(name: string, items: Lendable[]): ReserveRequest {
        const bundles: LendableGroup[] = [];
        const map: Map<number, number> = new Map();
        for (const lendable of items) {
            const id: number = lendable.id;
            let newValue = 1;
            if (map.has(id)) {
                const current: number | undefined = map.get(id);
                if (current !== undefined) {
                    newValue = current + 1;
                }
            }
            map.set(id, newValue);
        }
        const rows: LendableGroup[] = [];
        for (const key of map.keys()) {
            const value: number | undefined = map.get(key);
            if (value !== undefined) {
                rows.push(new LendableGroup(key, value));
            }
        }
        return new ReserveRequest(name, rows);
    }
}
