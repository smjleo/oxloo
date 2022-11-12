export class PostedReview {
//   premium: boolean;
    id: string;
    text: string;
    rate: number;
    date: string;

    constructor({ id, text, rate, date }: PostedReview) {
    // this.premium = premium;
    // this.rate = rate;
    this.id = id;
    this.text = text;
    this.rate = rate;
    this.date = date;
    }
    
}
