import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './users.shema';
import { NotFoundException } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { log } from 'console';

@Injectable()
class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findAll() {
    return this.userModel.find();
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  create(userData: UserDto) {
    const createdUser = new this.userModel({
      ...userData,
    });
    return createdUser.save();
  }
  async update(id: string, userData: UserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, userData);
    if (!user) throw new NotFoundException();
    return 'Success';
  }
  async delete(id: string) {
    console.log(id);
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
    return 'Success';
  }
  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
export default UserService;
