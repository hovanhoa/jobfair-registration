import { ForbiddenException, UnauthorizedException } from "@nestjs/common";
import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
	catch(exception: UnauthorizedException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

        // request.session["redirectUrl"] = request.originalUrl; 
		return response.redirect("/login");
	}
}
