import { CommunityMember } from './CommunityMember';
import { Lendable } from './Lendable';

export class PendingLoan {
    constructor(public id: number,
                public lendable: Lendable,
                public count: number,
                public name: string,
                public milliseconds: bigint,
                public member: CommunityMember) {}
}
