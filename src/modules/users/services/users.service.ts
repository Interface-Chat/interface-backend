import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreaetUserType, UserByIdType } from 'src/utils/types';
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
  
// Get user by  user_ID
async findUserByID(user_id:string){
  const findAUserById = await User.findOne({
    where:{
      id : user_id,
    }
  });
  return findAUserById;
}
//Get password 
async findUserPassword(password:string){
  const findAUserById = await User.findOne({
    where:{
      password:password,
    }
  });
  return findAUserById;
}


  
//update userinfo 
  async updateUsersInfo(username:string ,updateUserInfo: UpdateUserType){
  await this.findOneUser(username);
  return this.usersRepositiry.update({username},{...updateUserInfo});
  }

// delete a user 
  deleteUser(username:string){
    return this.usersRepositiry.delete({username});
}


//compare password


  //create muliple users 
async createMultipleUsers(): Promise<void>{}


}
