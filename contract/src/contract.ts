import { NearBindgen, near, call, view } from 'near-sdk-js'
import { POINT_ONE, PostedMessage } from './model'

@NearBindgen({})
class GuestBook {
  messages: PostedMessage[] = [];
  @call({})
  add_message({  text, rate }: { text: string , rate: number }) {
    // If the user attaches more than 0.01N the message is premium
    // const premium = near.attachedDeposit() >= BigInt(POINT_ONE);
    const message = new PostedMessage({ text, rate });
    this.messages.push(message);
  }

  @view({})
  get_messages({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostedMessage[] {
    return this.messages.slice(from_index, from_index + limit);
  }
}
