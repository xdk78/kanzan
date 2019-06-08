import { prop, Typegoose } from 'typegoose'

export default class Tag extends Typegoose {
  @prop()
  name: string
}
