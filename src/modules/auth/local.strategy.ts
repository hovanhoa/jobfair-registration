// import { UserService } from './../../services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt'; 
import { UserService } from 'src/services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            usernameField: 'email'
        });
    }
    // Authentication: Xác thực
    // Authorization: Xác minh
    async validate(email: string, password: string) {
        const user = await this.userService.getOne(email);
        if (!user) throw new UnauthorizedException("Không tồn tại tài khoản này");
        if (!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException("Sai tài khoản hoặc mật khẩu");
        return {
            email: user.email
        };
    }
}