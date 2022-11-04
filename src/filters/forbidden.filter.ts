import { ForbiddenException } from "@nestjs/common";
import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(ForbiddenException)
export class ForbiddenFilter implements ExceptionFilter {
	catch(exception: ForbiddenException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const message = exception.message;

		if (message == "Uninitialized user") response.redirect("/user/index");
		else {
			response.redirect("/403");
		}
	}
}
