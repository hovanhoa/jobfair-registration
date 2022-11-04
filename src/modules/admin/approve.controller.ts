import { RoleGuard } from './../../guards/role.guard';
import { registrationController } from './registration.controller';
import { Registration } from 'src/models/registration.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { enterpriseService } from 'src/services/enterprise.service';
import { StallService } from 'src/services/stall.service';
import { registrationService } from 'src/services/registration.service';
import { Stall } from 'src/models/stall.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/constants/user.constant';

@Controller('approve')
export class ApproveController {
  constructor(
    private registrationService: registrationService,
    private stallService: StallService,
    private enterpriseService: enterpriseService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Render('approve/index')
  async index(@Res() res: Response, @Req() req: Request) {
    var listEnterprise = await this.enterpriseService.getAll();
    let listRegistrationwithapproved = [];
    let listRegistration = [];
    var i = 0;
    // console.log(listEnterprise);
    for (const enterprise of listEnterprise) {
      // console.log(enterprise);

      var temp = await this.registrationService.getLastRegistration(
        enterprise.email,
      );
      // console.log(temp);
      if (temp.length == 0) continue;
      listRegistration[i] = {
        email: temp[0].enterprise.email,
        name: temp[0].enterprise.name,
        updatedAt: temp[0].updatedAt,
        lock: temp[0].lock,
      };
      // console.log(await this.registrationService.getLastRegistration(enterprise.email));
      i++;
    }
    // console.log(listRegistration);
    if (!listRegistration)
      return {
        listRegistration: [],
      };
    else
      return {
        listRegistration: listRegistration,
      };
  }

  @Post('/approved')
  @UseGuards(AuthGuard('jwt'))
  async approved(@Res() res: Response, @Body() registration: Registration) {
    // Lock registratoin
    var email = registration;
    var registrationList = await this.registrationService.getByEmail(
      email['email'],
    );
    await this.registrationService.deleteByEmail(email['email']);
    for (const registration of registrationList) {
      var registrationToAdd: Registration = new Registration();
      registrationToAdd.createdAt = registration.createdAt;
      registrationToAdd.enterprise = registration.enterprise;
      registrationToAdd.lock = 1;
      registrationToAdd.tick = registration.tick;
      registrationToAdd.priorityNumber = registration.priorityNumber;
      registrationToAdd.registration_id = registration.registration_id;
      registrationToAdd.stall = registration.stall;
      registrationToAdd.updatedAt = registration.updatedAt;

      await this.registrationService.add(registrationToAdd);
    }
	// tick registered stall
	for (const registration of registrationList) {
		if(registration.tick == 1){
			var stall = await this.stallService.getOne(registration.stall.id);
			await this.stallService.register(1 ,stall.id);
		}
	}

	// Untick another registeraion
	for (const registration of registrationList) {
		if(registration.tick == 1){
			var resgis = await this.registrationService.getMany(registration.stall.id);
			console.log(resgis);
			for(const re of resgis){
				await this.registrationService.untickAnother(0 ,re.registration_id);
			}
			await this.registrationService.untickAnother(1 ,registration.registration_id);
			
		}
	}



    res.redirect('/approve');
  }

  @Post('/unapproved')
  @UseGuards(AuthGuard('jwt'))
  async unapproved(@Res() res: Response, @Body() registration: Registration) {
    //   await this.stallService.delete(stall);
    var email = registration;
    // console.log(email['email']);
    var registrationList = await this.registrationService.getByEmail(
      email['email'],
    );
    await this.registrationService.deleteByEmail(email['email']);
    for (const registration of registrationList) {
      var registrationToAdd: Registration = new Registration();
      registrationToAdd.createdAt = registration.createdAt;
      registrationToAdd.enterprise = registration.enterprise;
      registrationToAdd.lock = 0;
      registrationToAdd.tick = registration.tick;
      registrationToAdd.priorityNumber = registration.priorityNumber;
      registrationToAdd.registration_id = registration.registration_id;
      registrationToAdd.stall = registration.stall;
      registrationToAdd.updatedAt = registration.updatedAt;
      await this.registrationService.add(registrationToAdd);
    }

	// Untick registered stall
	for (const registration of registrationList) {
		if(registration.tick == 1){
			var stall = await this.stallService.getOne(registration.stall.id);
			await this.stallService.register(0 ,stall.id);
		}
	}
    res.redirect('/approve');
  }

  @Post('/add')
  @UseGuards(AuthGuard('jwt'))
  async add(@Res() res: Response, @Req() req: Request) {
    // console.log(req.body);
    var list = req.body.tick;
    for (let i = 0; i < list.length; i++) {
      if (list[i] == 0 && list[i + 1] == 1) list.splice(i, 1);
    }

    var listEnterprise = await this.registrationService.getByEmail(
      req.body.email,
    );
    await this.registrationService.deleteByEmail(req.body.email);
    var index = 0;
    for (const registration of listEnterprise) {
      var registrationToAdd: Registration = new Registration();
      registrationToAdd.createdAt = registration.createdAt;
      registrationToAdd.enterprise = registration.enterprise;
      registrationToAdd.lock = registration.lock;
      registrationToAdd.tick = list[index];
      registrationToAdd.priorityNumber = registration.priorityNumber;
      registrationToAdd.registration_id = registration.registration_id;
      registrationToAdd.stall = registration.stall;
      registrationToAdd.updatedAt = registration.updatedAt;
      await this.registrationService.add(registrationToAdd);
      index++;
    }
    res.redirect('/approve');
  }

  @Post('/registrationList')
  async registrationList(
    @Body() Registration: Registration,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    var email = req.body['email'];
    // console.log(email);

    let registrationList = await this.registrationService.getByEmail(email);
    // console.log(registrationList);
    if (registrationList.length > 0) {
      return res.json({
        data: registrationList,
      });
    }
  }

  @Post('/numberStallRegister')
  async numberStallRegister(
    @Body() Registration: Registration,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    var email = req.body['email'];
    // console.log(email);

    let enterprise = await this.enterpriseService.getOne(email);
    // console.log(registrationList);
    if (enterprise) {
      return res.json({
        data: enterprise,
      });
    }
  }
}
