
import { registrationService } from 'src/services/registration.service';
import { Registration } from './../../models/registration.entity';
import { StallService } from './../../services/stall.service';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Render, Res, UseGuards } from "@nestjs/common";
import { Stall } from 'src/models/stall.entity';
import { Request, Response } from 'express';

@Controller('stall')
export class stallController {
    constructor(private stallService: StallService, private registrationService: registrationService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Render('stall/index')
    async index(){
        var stallList = await this.stallService.getAll();
        return {
            stallList: stallList,
        };
    }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    async add(@Res() res: Response, @Body() stall: Stall) {
      await this.stallService.add(stall);
      res.redirect('/stall');
    }


    @Post('/edit')
    @UseGuards(AuthGuard('jwt'))
    async edit(@Res() res: Response, @Body() stall: Stall) {
      await this.stallService.edit(stall);
      res.redirect('/stall');
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Res() res: Response, @Body() stall: Stall) {
      await this.stallService.delete(stall);
      res.redirect('/stall');
    }
}