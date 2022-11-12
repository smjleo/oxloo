export const POINT_ONE = '100000000000000000000000';

export class PostedMessage {
//   premium: boolean;
  rate: number;
  text: string;

  constructor({ text, rate }: PostedMessage) {
    // this.premium = premium;
    // this.rate = rate;
    this.text = text;
    this.rate = rate;
  }
  
}
