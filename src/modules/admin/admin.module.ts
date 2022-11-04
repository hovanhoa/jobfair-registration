import { ApproveController } from './approve.controller';
import { Enterprise } from './../../models/enterprise.entity';
import { Registration } from './../../models/registration.entity';
import { Stall } from './../../models/stall.entity';
import { registrationService } from './../../services/registration.service';
import { enterpriseService } from './../../services/enterprise.service';
import { StallService } from './../../services/stall.service';
import { registrationController } from './registration.controller';
import { stallController } from './stall.controller';
import { enterpriseController } from './enterprise.controller';

import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Stall, Registration, Enterprise, User])],
    providers: [StallService, enterpriseService, registrationService, UserService],
    controllers: [enterpriseController, stallController, registrationController, UserController, ApproveController],
})
export class AdminModule {}