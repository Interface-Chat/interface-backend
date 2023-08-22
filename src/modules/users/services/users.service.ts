import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)private usersRepositiry:Repository<User>){

  }
  async createUser(createUserDto:CreateUserDto): Promise<User>{
    const user = await this.usersRepositiry.create(createUserDto);
    await user.save();

    delete user.password;
    return user;


  }
  async findUserByEmail(email: string){
    return await User.findOne({
      where: {
        email: email,
      }
    })
  }

  




  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
