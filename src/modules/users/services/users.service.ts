import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeforeInsert, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {
  CreaetUserType,
  ReturnUserDetail,
  UpdateUserType,
  UserByIdType,
} from 'src/utils/types';
import { Role } from '../../roles/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { AdminUpdateUserDto } from '../dto/AdminUpdate.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepositiry: Repository<User>,
    @InjectRepository(Role) private roleRepositiry: Repository<Role>,
  ) {}

  findUsers() {
    // const findRole = this.roleRepositiry.find();
    const findUsers = this.usersRepositiry.find({relations :{role:true}});
    return findUsers;
  }
  

  async createUser(createuserDto: CreateUserDto) {
    try {
      const user = new User();
      user.role = await this.roleRepositiry.findOne({where: {id: createuserDto.role_id}})
      user.username =createuserDto.username
      user.email = createuserDto.email;
      user.fullName = createuserDto.fullname;
      user.mobile = createuserDto.mobile;
      user.password=createuserDto.password;
      user.profile_img=createuserDto.profile_img;
      // ({CreateAT : new Date()});
      // ({user.CreateAT:new Date()})

      
     
      await user.save();
    
      delete user.password;
      return user;
    } catch (e) {
      console.log(e);
      
      throw new BadRequestException(e.message);
    }
  }
  //Create User
  // async createUser(createUserType:CreaetUserType): Promise<User>{

  //   const user = await this.usersRepositiry.create({
  //     ...createUserType,

  //   });
  //   await user.save();

  //   delete user.password;
  //   return user;
  // }
  

  //find email
  async findUserByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  //find a user to compare log in
  async findUserByUsername(username: string) {
    return await User.findOne({
      where: {
        username: username,
      },
      relations:{role:true},
    });
  }
  //patch password
  // async updatePW(password:string){
  //   await this.findUserPassword(password)
  //   const update = await this.usersRepositiry.update(...password)
  // }

  //find a user name and return date
  async findOneUser(username: string) {
    const findAUser = await User.findOne({
      where: {
        username: username,
      },
      relations: { role: true }
    });
    return findAUser;
  }

  // Get user by  user_ID
  async findUserByID(user_id: number) {
    const findAUserById = await User.findOne({
      where: {
        id: user_id,
        // role:create.role_id,
      },
      relations:{role:true}
    });
    return findAUserById;
  }
  //Get password
  async findUserPassword(password: string) {
    const finduserPassword = await User.findOne({
      where: {
        password: password,
      },
    });
    return finduserPassword;
  }
  //update user by admin 
  async updateUserByAdmin(id:number,adminUpdateUser:AdminUpdateUserDto){
    await this.findUserByID(id)
    return this.usersRepositiry.update(+id,adminUpdateUser)
    // const user = new User();
    
  }

  //update userinfo

  async updateUsersInfo(username: string, updateUserInfo: UpdateUserType) {
    await this.findOneUser(username);

    return this.usersRepositiry.update({ username }, { ...updateUserInfo });
  }

  // delete a user
  deleteUser(username: string) {
    return this.usersRepositiry.delete({ username });
  }

  //compare password

  //create muliple users
//   async createMultipleUsers(): Promise<void> {}
}
