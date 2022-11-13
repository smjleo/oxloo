export const POINT_ONE = '100000000000000000000000';

export class PostedMessage {
    text: string;
    rating: number;
    id: string;
    date: string;

    constructor({ id, date, rating, text }: PostedMessage) {
        this.rating = rating;
        this.id = id;
        this.text = text;
        this.date = date;
    }
}