export class CheckoutResponse {
    constructor(public checkedOutList: number[],
                public notFoundList: number[]) { }
}
