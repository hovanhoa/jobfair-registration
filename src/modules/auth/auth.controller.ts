// import { UserService } from './../../services/user.service';
import { UserService } from 'src/services/user.service';
// import { User } from './../../models/user.entity';
import { query, Request, Response } from 'express';
import {
  Controller,
  Get,
  Render,
  UseGuards,
  Post,
  Req,
  Res,
  Redirect,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';
import { UserRole, UserStatus } from 'src/constants/user.constant';

@Controller()
export class AuthController {
  constructor(private jwtService: JwtService, private UserService: UserService) {}

  @Get('login')
  @Render('login/index')
  async loginPage(@Req() req: Request) {
    const message = req.query['message'];
    const viewBag = {
      message: message
    }
    return viewBag;
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @Redirect('/enterprise')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    console.log(user);
    const accessToken = this.jwtService.sign(user);
    res.cookie('JF', accessToken);
    const email = user;
    return {
      email: email,
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Res() res: Response, @Req() req: Request) {
    const user = req.user;
    // console.log(user);
    const accessToken = this.jwtService.sign(user);


		// const oldUser = await this.userService.getOne(user["email"]);

		// if (!oldUser && domain != "hcmut.edu.vn")
		// 	throw new ForbiddenException(
		// 		"Tài khoản này không thể sử dụng để vào hệ thống"
		// 	);

    res.cookie('JF', accessToken);
    var flag = false;
		if (user["email"] == process.env.ADMIN) {
			const user = new User();
			user.email = process.env.ADMIN;
			user.role = UserRole.ADMIN;
			user.init = UserStatus.INITIALZED;
      const oldUser = await this.UserService.getOne(process.env.ADMIN);
			if (!oldUser) await this.UserService.add(user);
			flag = true;
		}
    // if (req.session["redirectUrl"])
    // return res.redirect(req.session["redirectUrl"]);
  if (flag) return res.redirect("/users");
  // else if (user["role"] == UserRole.FACULTY || user["role"] == UserRole.UNI)
  //   return res.redirect("/activity/index");
  else return res.redirect("/enterprise");

  }



  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('BKM');
    return res.redirect('/login');
  }
}
