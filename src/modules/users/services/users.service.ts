import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreaetUserType } from 'src/utils/types';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserType } from 'src/utils/update_type';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)private usersRepositiry:Repository<User>){ }

  findUsers(){
    return this.usersRepositiry.find();
  }
  //Create User 
  async createUser(createUserType:CreateUserDto): Promise<User>{
    const user = await this.usersRepositiry.create({
      ...createUserType,
      CreateAT : new Date(),
      
    });
    await user.save();

    delete user.password;
    return user;
  }
  
//find email
  async findUserByEmail(email: string){
    return await User.findOne({
      where: {
        email: email,
      }
    })
  }

  //find a user to compare log in  
  async findUserByUsername(username: string){
    return await User.findOne({
      where: {
        username:username,
      }
    })
  }

//find a user name and return date 
async findOneUser(username:string){
  const findAUser = await User.findOne({
    where: {
      username: username ,
    }
  });
  return findAUser;
}
  
  //Reset password by patch password 
  
  //
  async updateUsersInfo(username:string ,updateUserInfo: UpdateUserType){
  await this.findOneUser(username);
  return this.usersRepositiry.update({username},{...updateUserInfo});
  }

  // delete a user 
  deleteUser(username:string){
    return this.usersRepositiry.delete({username});
}

  //create muliple users 
async createMultipleUsers(): Promise<void>{}
  // async createMultipleUsers(usersData: User[]): Promise<User[]> {
  //   const createdUsers: User[] = [];
  //   for (const userData of usersData) {
  //     const createdUser = await this.createUser(userData);
  //     createdUsers.push(createdUser);
  //   }
  //   return createdUsers;
  // }

  


  




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
