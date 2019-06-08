import { prop, Typegoose, arrayProp, Ref } from 'typegoose'
import Tag from './Tag'
import User from '../User'

export default class Post extends Typegoose {
  @prop({ ref: { name: 'User' }, unique: true })
  author: Ref<User>

  @prop()
  title: string

  @prop()
  description: string

  @arrayProp({ itemsRef: { name: 'Tag' }, unique: true })
  tags?: Ref<Tag>[]

  @prop({ required: true })
  createdAt: string
}
