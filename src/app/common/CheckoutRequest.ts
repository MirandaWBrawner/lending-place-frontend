import { LendableGroup } from './LendableGroup';
import { PendingLoan } from './PendingLoan';

export class CheckoutRequest {
    constructor(public memberId: number,
                public lendables: LendableGroup[]) { }
    static buildForSingleCopy(loan: PendingLoan): CheckoutRequest {
        const group = new LendableGroup(loan.lendable.id, 1);
        return new CheckoutRequest(loan.member.id, [group]);
    }
    static buildForMultiple(loan: PendingLoan): CheckoutRequest {
        const group = new LendableGroup(loan.lendable.id, loan.count);
        return new CheckoutRequest(loan.member.id, [group]);
    }
}
