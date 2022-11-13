import { NearBindgen, near, call, view } from 'near-sdk-js'
import { POINT_ONE, PostedMessage } from './model'

@NearBindgen({})
class GuestBook {
    reviews: PostedMessage[] = [];

    @call({ payableFunction: true })
    add_review({ id, date, rating, text }: { id: string, date: string, rating: number, text: string }) {
        /*
        // If the user attaches more than 0.01N the message is premium
        const premium = near.attachedDeposit() >= BigInt(POINT_ONE);
        const sender = near.predecessorAccountId();
        */

        const review = new PostedMessage({ id, date, rating, text });
        this.reviews.push(review);
    }

    @view({})
    get_reviews(): PostedMessage[] {
        return this.reviews;
    }

    @view({})
    get_average_rating({ id } : { id: string }) {
        let sum = 0, cnt = 0;
        for (let review of this.reviews) {
            if (review.id !== id) continue;
            sum += review.rating;
            cnt++;
        }

        if (cnt === 0) return 0;
        else return sum / cnt;
    }
}