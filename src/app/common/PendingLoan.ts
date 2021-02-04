import { Lendable } from "./Lendable";

export class PendingLoan {
    constructor(public id: number,
                public lendable: Lendable,
                public count: number,
                public name: string,
                public milliseconds: number) {}
    get date(): Date {
        return new Date(this.milliseconds);
    }
}
