import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BeforeInsert, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
// import {
//   CreaetUserType,
//   ReturnUserDetail,
//   UpdateUserType,
//   UserByIdType,
// } from 'src/utils/types';
import { Role } from '../../roles/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { AdminUpdateUserDto } from '../dto/AdminUpdate.dto';
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Observable, from } from 'rxjs';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepositiry: Repository<User>,
    @InjectRepository(Role) private roleRepositiry: Repository<Role>,
    private imageService: UploadFileService,
  ) {}

  findUsers() {
    const findUsers = this.usersRepositiry.find({
      relations: { roles: true, userToTag: { tag: true } },
      select: { roles: { name: true } },
    });
    return findUsers;
  }
  

  async createUser(createuserDto: CreateUserDto) {
    // const ExistingUsername = await this.usersRepositiry.exist
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
      select:{roles:{name:true}},
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
  async uploadImage(id: number, img?: any) {
    try {
      await this.findUserByID(+id);
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
  async updateUsersInfo(id: number, updateUserInfo:UpdateUserDto) {
    // await this.findOneUser(username);
    await this.findUserByID(+id);

    return this.usersRepositiry.update({ id }, { ...updateUserInfo });
  }

  //search user
  async search(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.usersRepositiry, {
      sortableColumns: ['username', 'roles', 'fullName', 'mobile'],
      searchableColumns: ['username', 'roles', 'fullName', 'mobile'],
      relations: { roles: true },
      // searchableColumns:['username',]
    });
  }

  // delete a user
  deleteUserById(id: number) {
    return this.usersRepositiry.delete(id);
  }
  // delete by username
  deleteUserByusername(username: string) {
    return this.usersRepositiry.delete(username);
  }

  //Create multiple User in a time
  async createMultipleUser(users: CreateUserDto[]): Promise<User[]> {
    const createUsers: User[] = [];
    for (const userData of users) {
      const user = this.usersRepositiry.create(userData);
      const createdUser = await this.usersRepositiry.save(user);
      createUsers.push(createdUser);
    }
    return createUsers;
  }

  //upload image no working now
  updateUserImageById(id: number, imagePath: string): Observable<UpdateResult> {
    const user = new User();
    user.id = id;
    user.profile_img = imagePath;
    return from(this.usersRepositiry.update(id, user));
  }

  // deleteUser(id:number,username: string) {
  //   const user:any = {id,username}
  //   if(user.id==id){
  //   return this.usersRepositiry.delete({ ...user.id });
  //   }else if(user.username==username){
  //     return this.usersRepositiry.delete({ ...user.username});
  //   }
  //   else{
  //     return'You are not this User. So you cannot delete this user!!!'
  //   }
  // return this.usersRepositiry.delete({ username });
  // }
}
