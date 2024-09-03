import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, HydratedDocument } from 'mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  gender: string;
  @Prop()
  birth: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
