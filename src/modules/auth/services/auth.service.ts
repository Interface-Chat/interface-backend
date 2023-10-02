import { BadRequestException, Injectable} from '@nestjs/common';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePassWordType} from 'src/utils/types';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService,
        private imageService: UploadFileService

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
        delete user.password;
        return user ;
    }

    //update password 
    async changePassword(id:number,changePassword:ChangePassWordType){
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
} 
