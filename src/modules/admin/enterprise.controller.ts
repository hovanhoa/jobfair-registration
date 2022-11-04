import { RoleGuard } from './../../guards/role.guard';
// import { Roles } from './../../decorators/role.decorator';
import { User } from 'src/models/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Enterprise } from './../../models/enterprise.entity';
import { enterpriseService } from './../../services/enterprise.service';
import { Body, Controller, Get, Post, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express';
import * as moment from 'moment';
import { UserRole } from 'src/constants/user.constant';

@Controller('enterprise')
export class enterpriseController{
    constructor(private enterpriseService: enterpriseService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Render('enterprise/index')
    async index(@Res() res: Response,@Req() req: Request){
        const user = req.user;
        const email = user['email'];
        // console.log(email);
        var enterprise = await this.enterpriseService.getOne(email);
        // console.log(enterprise);
        // enterprise = null;
        if(!enterprise) return {
            
            enterprise: [],
            email: email
        }
        else return {
            enterprise: enterprise,
            email: email
        }


    }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    async edit(@Res() res: Response, @Req() req: Request, @Body() Enterprise: Enterprise) {
      var enterpriseold = await this.enterpriseService.getOne(req.user['email']);
      console.log(enterpriseold);
      if(!enterpriseold) await this.enterpriseService.add(Enterprise);
      else await this.enterpriseService.edit(Enterprise);
    //   await this.enterpriseService.edit(enterprise);
      res.redirect('/enterprise');
    }

    // @Post('/add')
    // async add(@Res() res: Response, @Body() Enterprise: Enterprise) {
    //     await this.enterpriseService.add(Enterprise);
    //     res.redirect('/enterprise');
    // }
}