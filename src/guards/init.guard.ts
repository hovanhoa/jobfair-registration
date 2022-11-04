// import { ActivityApproval } from './../constants/activity.constant';
import { UserRole } from "src/constants/user.constant";
import { Response } from "express";
import { UserStatus } from "src/constants/user.constant";
import { Request } from "express";
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class InitGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request: Request = context.switchToHttp().getRequest();
		const response: Response = context.switchToHttp().getResponse();
		if (request.user["init"] === UserStatus.UNINITIALZED) {
			throw new ForbiddenException("Uninitialized user");
		}
		response.locals["user"] = request.user;
		response.locals["UserRole"] = UserRole;
		// response.locals["ActivityApproval"] = ActivityApproval
		return true;
	}
}
