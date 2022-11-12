import { NearBindgen, near, call, view } from 'near-sdk-js'
import { PostedReview } from './model'

@NearBindgen({})
class GuestBook {
  reviews: PostedReview[] = [];
  @call({})
  add_review({  text, rate }: { text: string , rate: number }) {
    const review = new PostedReview({ text, rate });
    this.reviews.push(review);
  }

  @view({})
  get_reviews({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostedReview[] {
    return this.reviews.slice(from_index, from_index + limit);
  }
}
