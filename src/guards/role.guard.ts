// import { ActivityApproval } from './../constants/activity.constant';
import { ROLES_KEY } from "./../decorators/roles.decorator";
// import { UserService } from "./../service/user.service";
import { Response } from "express";
import { UserRole } from "./../constants/user.constant";
import { Request } from "express";
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);

		console.log(requiredRoles);

		if (!requiredRoles) {
			return true;
		}
		const user = request.user;
		response.locals["user"] = user;
        // console.log(user);
		response.locals["UserRole"] = UserRole;
		// response.locals["ActivityApproval"] = ActivityApproval;
		return requiredRoles.some((role) => user["role"] == role);
	}
}
