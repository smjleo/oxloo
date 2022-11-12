import { NearBindgen, near, call, view } from 'near-sdk-js'
import { PostedReview } from './model'

@NearBindgen({})
class GuestBook {
  reviews: PostedReview[] = [];
  @call({})
  add_review({  id, text, rate, date }: { id: string, text: string , rate: number, date: string }) {
    const review = new PostedReview({ id, text, rate, date });
    this.reviews.push(review);
  }

  @view({})
  get_reviews({ from_index = 0, limit = this.reviews.length }: { from_index: number, limit: number }): PostedReview[] {
    return this.reviews.slice();
  }
  get_reviews_by_id({id}: {id: string}): PostedReview[] {
    let filtered = [];
    for(let i =0;i<this.reviews.length;i++){
      if(this.reviews[i].id == id) filtered.push(this.reviews[i]);
    }
    return filtered.slice();
  }
  get_average_rating({id}: {id:string}): number {
    let sum =0;
    let cnt =0;
    for(let i =0;i<this.reviews.length;i++){
      if(this.reviews[i].id == id){
        sum = sum+this.reviews[i].rate;
        cnt++;
      } 
    }
    if(cnt==0)return 0;
    else return sum/cnt
  }
}
