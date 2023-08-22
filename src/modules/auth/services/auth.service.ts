import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService:UsersService, private jwtService:JwtService) { }

    async login(authLoginDto: UserLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const { email, password } = userLoginDto;

        const user = await this.usersService.findUserByEmail(email);
        if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user ;
    }

}
