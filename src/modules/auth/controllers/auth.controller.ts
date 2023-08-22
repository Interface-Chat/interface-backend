import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dtos/user_login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){

    }

    @Post('login')
    async login(@Body()authloginDto:UserLoginDto){
        return this.authService.login(authloginDto);

    }

}
