import { Stall } from './../../models/stall.entity';
import { Registration } from './../../models/registration.entity';
import { enterpriseService } from './../../services/enterprise.service';
import { StallService } from './../../services/stall.service';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from "@nestjs/common";
import { registrationService } from 'src/services/registration.service';
import { Request, Response } from 'express';

@Controller('registration')
export class registrationController{

    constructor(private registrationService: registrationService, private stallService: StallService, private enterpriseService: enterpriseService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Render('registration/index')
    async index(@Res() res: Response,@Req() req: Request){
        const user = req.user;
        const email = user['email'];
        var registrationList = await this.registrationService.getByEmail(email);
        // var enterpriseList = await this.enterpriseService.getAll();
        var stallList = await this.stallService.getWithNoRegistered();
        var registrationlast = await this.registrationService.getLastRegistration(email);
        // console.log(registrationlast);
        var lock;
        if(registrationlast.length == 0) lock = 0;
        else lock = registrationlast[0].lock;
        // console.log(registrationlast[0]);
        // var lock = registrationlast[0].lock;
        return {
            lock: lock,
            email: email,
            registrationList: registrationList,
            // enterpriseList: enterpriseList,
            stallList: stallList,
        };
    }

    @Post("/listStall")
    async canvasOnLoad(@Body() stall: Stall, @Res() res: Response) {
        let stallList = await this.stallService.getAll();
        // console.log(stallList);
        if(stallList.length>0) {
            res.json({
                data: stallList
        });
    }
    }

    
    @Post("/add")
    @UseGuards(AuthGuard('jwt'))
    async add(@Body() registration: any, @Res() res: Response,@Req() req: Request) {
        // await this.registrationService.deleteAll();
        const user = req.user;
        const email = user['email'];
        await this.registrationService.deleteByEmail(email);
        if(registration.id == null){
            res.redirect("/registration");
        }
        else {
            
            var numberPrior = 1;
            // console.log(numberPrior);
            for(const i of registration.id)
            {
                var registrationToAdd: Registration = new Registration();
                registrationToAdd.enterprise = email;
                registrationToAdd.priorityNumber = numberPrior;
                registrationToAdd.stall = i;
                await this.registrationService.add(registrationToAdd);
                numberPrior++;
            }
            res.redirect("/registration");
        }
    }
}