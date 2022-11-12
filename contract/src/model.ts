export class PostedReview {
//   premium: boolean;
  rate: number;
  text: string;

  constructor({ text, rate }: PostedReview) {
    // this.premium = premium;
    // this.rate = rate;
    this.text = text;
    this.rate = rate;
  }
  
}
