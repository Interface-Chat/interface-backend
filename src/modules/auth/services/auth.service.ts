import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';
import { ChangePassWord } from '../dtos/password_reset.dto';
import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService,
        private imageService: UploadFileService,
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,

    ) { }

    async login(user:UserLoginDto) {
        const isvalid = await this.validateUser(user);
        console.log(isvalid);
        
        // const payload = isvalid;
        return {
            access_token: this.jwtService.sign({
                payload: isvalid,
            }),
        };
    }
    async validateUser(userLoginDto: UserLoginDto): Promise<any> {
        const { username, password } = userLoginDto;

        const user = await this.usersService.findUserByUsername(username);
        if (!(await user.validatePassword(password))) {
            throw new BadRequestException('password is invalided ');
        }
        var query = this.tagRepository.createQueryBuilder("tag")
    .leftJoinAndSelect("tag.userToTag", "user_tag")
    .leftJoinAndSelect("user_tag.user", "user")
    .where("user.id = :userId", {userId: user.id});
    
    var tags = await query.getMany()
        delete user.password;
        return {...user, tags: tags.map(({ userToTag, ...rest }) => rest)} ;
    }

    //update password 
    async changePassword(id:number,changePassword:ChangePassWord){
        const {new_password , password} =changePassword;
        const user = await this.usersService.findUserByID(+id)
        if(!await user.validatePassword(password)){
            return 'old_password is invalid';
        }
        user.password=new_password;
        await user.save(); 
    }
    async updateAuthInfo(id:number, updateUserInfo: UpdateUserDto) {
        return await this.usersService.updateUsersInfo(+id,updateUserInfo);
    }

    async uploadImage(image:any){
        const user = new User();
        user.profile_img= this.imageService.deleteAndAdd(image,'./assets/profile')
        await user.save();
    }

    async verify(token: string): Promise<any> {
        try {
          const payload = this.jwtService.verify(token);
          return payload;
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
      }

      private extractToken(authorizationHeader: string): string {
        if (!authorizationHeader) {
          throw new UnauthorizedException('Authorization header is missing');
        }
    
        const parts = authorizationHeader.split(' ');
    
        if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
          throw new UnauthorizedException('Invalid authorization header format');
        }
    
        return parts[1];
      }
} 
