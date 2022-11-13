import { NearBindgen, near, call, view } from 'near-sdk-js'
import { PostedReview } from './model'

@NearBindgen({})
class RateAndReview {
    reviews = [];

    @view({})
    get_average_rating({ id }: { id: string }): number {
        near.log(id);
        near.log(this.reviews);
        near.log(this);

        let sum = 0;
        let cnt = 0;
        for (let review of this.reviews) {
            if (review.id === id) {
                sum += review.rate;
                cnt++;
            }
        }
        if (cnt === 0) return 0;
        else return sum / cnt

    }

    @call({ payableFunction: true })
    add_review({ id, text, rate, date }: { id: string, text: string, rate: number, date: string }) {
        near.log(this.reviews);
        const review = new PostedReview({ id, text, rate, date });
        this.reviews.push(review);
    }

    @call({})
    clear_reviews() {
        this.reviews = [];
    }

    @view({})
    get_reviews(): PostedReview[] {
        return this.reviews;
    }

    @view({})
    get_reviews_by_id({ id }: { id: string }): PostedReview[] {
        near.log(this.reviews);
        let filtered = [];
        for (let review of this.reviews) {
            if (review.id === id) filtered.push(review);
        }
        return filtered;
    }


}