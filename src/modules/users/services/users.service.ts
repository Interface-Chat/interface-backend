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
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepositiry: Repository<User>,
    @InjectRepository(Role) private roleRepositiry: Repository<Role>,
    private imageService: UploadFileService,
  ) {}

  findUsers() {
    // const findRole = this.roleRepositiry.find();
    const findUsers = this.usersRepositiry.find({ relations: { roles: true}});
    return findUsers;
  }

  async createUser(createuserDto: CreateUserDto) {
    try {
      const user = new User();
      user.roles = await this.roleRepositiry.findOne({
        where: { id: createuserDto.role_id },
      });
      user.username = createuserDto.username;
      user.email = createuserDto.email;
      user.fullName = createuserDto.fullname;
      user.mobile = createuserDto.mobile;
      user.password = createuserDto.password;
      user.profile_img = createuserDto.profile_img;
    
      await user.save();

      delete user.password;
      return user;
    } catch (e) {
      console.log(e);

      throw new BadRequestException(e.message);
    }
  }

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
      relations: { roles: true },
    });
  }

  //find a user name and return date
  async findOneUser(username: string) {
    const findAUser = await User.findOne({
      where: {
        username: username,
      },
      relations: { roles: true },
    });
    return findAUser;
  }

  // Get user by  user_ID
  async findUserByID(user_id: number) {
    const findAUserById = await User.findOne({
      where: {
        id: user_id,
      },
      relations: { roles: true },
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
  async updateUserByAdmin(id: number, adminUpdateUser: AdminUpdateUserDto) {
    try {
      const user = await this.findUserByID(id);
      user.email = adminUpdateUser.email;
      user.fullName = adminUpdateUser.fullname;
      user.username = adminUpdateUser.username;
      user.password = adminUpdateUser.password;
      user.roles = adminUpdateUser.role_id;
      return this.usersRepositiry.save(user);
    } catch (e) {
      throw new BadRequestException('false');
    }

    // const user = new User();
  }
  //upload file
  async uploadImage(id:number,img?: any) {
    try {
      await this.findUserByID(+id)
      const Image = await this.imageService.saveImage(
        img,
        './src/assets/profile',
      );
      const user = new User();
      user.profile_img = Image;
      return this.usersRepositiry.save(user);
    } catch (e) {
      throw new BadRequestException();
    }
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
}
