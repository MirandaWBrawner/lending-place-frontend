export class Lendable {
    numberOnLoan = 0;
    constructor(public id: number,
                public english: string,
                public hindi: string,
                public swahili: string,
                public arabic: string,
                public mandarin: string,
                public spanish: string,
                public french: string,
                public creator: string,
                public imagePath: string,
                public numberAvailable: number,
                public newNumberOnLoan: number) {
                    if (imagePath === undefined
                        || imagePath === null
                        || imagePath === '') {
                            imagePath = 'defaultPicture.png';
                        }
                    if (newNumberOnLoan === undefined
                        || newNumberOnLoan === null) {
                            this.numberOnLoan = 0;
                        } else {
                            this.numberOnLoan = newNumberOnLoan;
                        }
                }
    get extendedImagePath(): string {
        let tempImagePath = this.imagePath;
        if (this.imagePath === undefined
            || this.imagePath === null
            || this.imagePath === '') {
                tempImagePath = 'defaultPicture.png';
            }
        return `assets/images/${tempImagePath}`;
    }

    name(language: string): string {
        switch (language) {
            case 'en':
            case 'en_us': return this.english;
            case 'hi':
            case 'hi_in': return this.hindi;
            case 'sw':
            case 'sw_tz': return this.swahili;
            case 'ar':
            case 'ar_eg': return this.arabic;
            case 'zh':
            case 'zh_cn': return this.mandarin;
            case 'es':
            case 'es_mx': return this.spanish;
            case 'fr':
            case 'fr_fr': return this.french;
            default: return '?';
        }
    }
}
