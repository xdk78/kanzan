import { prop, Typegoose, Ref, ModelType, staticMethod, arrayProp } from 'typegoose'
import Post from './post/Post'

enum Gender {
  OTHER = 'other',
  MALE = 'male',
  FEMALE = 'female'
}

export default class User extends Typegoose {
  @prop({ unique: true, required: true })
  username: string

  @prop({
    unique: true,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  })
  email: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  createdAt: string

  @arrayProp({ itemsRef: { name: 'Post' } })
  posts?: Ref<Post>[]

  @prop()
  avatar?: string

  @prop({ enum: Gender })
  gender?: Gender

  @prop({ required: true })
  secret: string

  @staticMethod
  static destroySessions(this: ModelType<User> & typeof User, id: Ref<User>, newSecret: string) {
    return this.updateOne({ _id: id }, { $set: { secret: newSecret } })
  }
}
