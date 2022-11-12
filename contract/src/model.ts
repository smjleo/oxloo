export class PostedReview {
//   premium: boolean;
    id: string;
    text: string;
    rate: number;
    
    


    constructor({ id, text, rate }: PostedReview) {
    // this.premium = premium;
    // this.rate = rate;
    this.id = id;
    this.text = text;
    this.rate = rate;
    }
    
}
