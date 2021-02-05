export class DonationRequest {
    constructor(public donorName: string,
                public amount: number,
                public cardNumber: string,
                public email: string,
                public phone: string,
                public mailingAddress: string,
                public currency: string) { }
}
